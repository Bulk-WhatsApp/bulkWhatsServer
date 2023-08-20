const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const date = require('date-and-time');
const qrcode = require('qrcode-terminal');
const { getAccountList, authWhatsAppModel } = require('../models/webModel');
const { getMobnoModel, msgSendModel } = require('../models/cronModel');




var clients = [];
const clientArray = async () => {
    try {
        const users = await getAccountList(); // Assuming userListModel returns a list of users



        if (users !== "Error") {
            clients = new Array(users.length).fill(undefined);

            for (const user of users) {
                if (user.whatsAct == "1") {

                    await intializeC(user.id);
                }
                else {
                    clients[user.id - 1] = user.id
                }



            }

        } else {
            console.log("Error in retrieving users from the model.");
        }
    } catch (error) {
        console.error("Error occurred while initializing clients:", error);
    }
};

const intializeC = async (userId) => {

    var cnt = 0
    var client = new Client({
        authStrategy: new LocalAuth({ clientId: userId })
    });



    client.on('loading_screen', (percent, message) => {
        console.log('LOADING SCREEN', percent, message);

    });

    client.on('qr', (qr) => {
        try {

            if (cnt >= 1) {


                client.destroy()

                authWhatsAppModel(userId, 0)
            }

            cnt++
        }
        catch (error) {

            client.destroy()
            console.log("Error in webWhatsController.js initializeWhats() on('qr') is ", error)

        }
    });

    client.on('authenticated', () => {
        authWhatsAppModel(userId, 1)
    });

    await client.initialize();
    clients[userId - 1] = client

}

const logoutWhatsApp = async (userId) => {
    try {

        clients[userId - 1].destroy()

        await authWhatsAppModel(userId, 0)

        return "WhatsApp Account Logout Successfully."

    } catch (error) {
        console.log("Error in webWhatsController.js logOutWhatsApp() is : ", error)
        return "Error"
    }

}

const intializeClient = async (userId, user, io) => {
    try {

        var client = new Client({
            authStrategy: new LocalAuth({ clientId: userId })
        });

        var cnt = 0

        client.on('loading_screen', (percent, message) => {
            console.log('LOADING SCREEN', percent, message);
            io.emit('progress', percent);
        });


        //clients[userId - 1] = client


        client.on('qr', (qr) => {

            qrcode.generate(qr, { small: true });
            //io.emit('qrCode', qr);
            try {

                if (cnt >= 1) {


                    client.destroy()
                    authWhatsAppModel(userId, 0)
                    io.emit('qrCode', "Please try after some Time");

                }
                else {
                    // if (userId == '1')
                    // qrcode.generate(qr, { small: true });

                    // qrcode.generate(qr, { small: true });
                    io.emit('qrCode', qr);


                    console.log("Counter for " + userId + " is " + cnt)
                }
                cnt++
            }
            catch (error) {
                // cnt++
                client.destroy()
                console.log("Error in webWhatsController.js initializeWhats() on('qr') is ", error)
                io.emit('qrCode', "Please try after some Time");
            }
        });



        client.on('authenticated', () => {

            authWhatsAppModel(userId, 1)
            io.emit('qrCode', "Application is Authenticated");
        });

        await client.initialize();

        clients[userId - 1] = client
    }
    catch (error) {
        console.log("Error in " + error)
    }

}

const sendWhatsMsg = async(userId,whatsapp,header_file,grpId) => {
    try { 
        var result = await getMobnoModel(grpId)
        if(result != "Error" && result.length > 0)
        {
            var mobNo ="91"+ result[0].mob_no
            
            if (header_file != null && header_file != '') {
            

                const media = await MessageMedia.fromUrl('http://vijenter.com:3001/assets/whatstemp/' + header_file);
    
    
    
                clients[userId - 1].sendMessage(mobNo + '@c.us', media);
            }
            
            if(whatsapp != null)
            clients[userId - 1].sendMessage(mobNo + '@c.us', whatsapp);

            msgSendModel(result[0].mob_no,grpId)


        }
        
        
    }
    catch (error) {
        console.log("Error in webWhatsController.js sendWhatsMsg() is : ",error)
    }
}

module.exports = { clientArray, logoutWhatsApp, intializeClient,sendWhatsMsg }
