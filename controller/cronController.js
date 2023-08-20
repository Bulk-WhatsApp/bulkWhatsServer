const { getCronJobModel, getMobnoModel, getEmailIdModel, emailSendModel } = require("../models/cronModel");
const { sendWhatsMsg } = require("./webWhatsController");
const path = require('path');
const nodemailer = require('nodemailer');
const { clear } = require("console");

const sendMessage = async () => {
    try {

        var result = await getCronJobModel()

        if (result != "Error") {
            result[0].forEach(element => {

                result[1].forEach(acc => {
                    if (acc.grp_id == element.grp_id) {

                        if (element.whats_camp == '1') 
                         sendWhatsMsg(acc.id, element.whatsapp, element.header_file, element.grp_id)
                        if (element.email_camp == '1')
                            sendMail(element.email, element.emailattach,element.emailSub,element.email_id,
                                element.email_password,element.email_acc,element.grp_id)

                    }
                });
            });

        }

    } catch (error) {
        console.log("Error in the cronController.js sendMesage() is :", error)
    }
}

async function sendMail(mail, attachment,subject,email,password,service,grpId) {
    try {
        var result = await getEmailIdModel(grpId)
        if(result != "Error" && result.length > 0)
        {
            var toEmail = result[0].email_id
            const transporter = nodemailer.createTransport({
                service: service,
                auth: {
                    user: email,
                    pass: password
                }
            });
    
            if(attachment != null && attachment != "null" && attachment !='')
            {
                var attachmentPath = path.join('public', 'assets', 'emailtemp', attachment);
    
                var mailDetails = {
                    from: email,
                    to: 'sourabh.patil1992@gmail.com',
                    subject: subject,
                    html: mail,
                    attachments: [
                        {
                            filename: attachment, // Name of the attachment
                            path: attachmentPath // Path to the attachment
                        }
                    ]
                };
            }
            else
            var mailDetails = {
                from: email,
                to: toEmail,
                subject: subject,
                html: mail
                
            };
    
            
    
            transporter.sendMail(mailDetails, function (err, data) {
                if (err) {
                    //console.log('Error Occurs');
                } else {
                    //console.log('Email sent successfully');
                }
            });

            emailSendModel(toEmail,grpId)
        }
        
    }
    catch (error) {
        console.log("Error in cronController.js sendMail() is :", error)
    }
}



module.exports = { sendMessage }