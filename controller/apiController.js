const { getWhatsTempModel, updateWhatsTempModel, getEmailTempModel, updateEmailTempModel, getSettingModel, updateSettingModel, databaseModel, whtasAccModel } = require("../models/apiModel")
const path = require('path');
var multer = require('multer');
const XLSX = require('xlsx');
const { logoutWhatsApp } = require("./webWhatsController");

var f_path = path.join('public', 'assets', 'whatstemp')
var e_path = path.join('public', 'assets', 'emailtemp')
var d_path = path.join('public', 'assets', 'datafile')
var file_name = ""



const getWhatsTemp = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body
        var result = await getWhatsTempModel(grp_id)
        if (result != "Error") {

            res.status(201).json(result)
        }
        else {
            res.status(500).json({ message: "Something Went Wrong." })
        }
    } catch (error) {
        console.log("Error in apiController.js getWhatsTemp() is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}

const getEmailTemp = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body
        var result = await getEmailTempModel(grp_id)
        if (result != "Error") {

            res.status(201).json(result)
        }
        else {
            res.status(500).json({ message: "Something Went Wrong." })
        }
    } catch (error) {
        console.log("Error in apiController.js getEmailTemp() is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}

const updateWhatsTemp = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body
        var { tempId, template, attachment } = req.query

        var result = await updateWhatsTempModel(tempId, template, attachment, grp_id, user_id)

        if (result != "Error") {

            res.status(201).json("Template Update Successfully.")
        }
        else {
            res.status(500).json({ message: "Something Went Wrong." })
        }


    } catch (error) {
        console.log("Error in apiController.js updateWhatsTemp is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}

const updateEmailTemp = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body
        var { tempId, template, attachment,subject } = req.query

        var result = await updateEmailTempModel(tempId, template, attachment,subject, grp_id, user_id)

        if (result != "Error") {

            res.status(201).json("Template Update Successfully.")
        }
        else {
            res.status(500).json({ message: "Something Went Wrong." })
        }


    } catch (error) {
        console.log("Error in apiController.js updateEmailTemp is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

        // Uploads is the Upload_folder_name
        cb(null, f_path)
    },
    filename: function (req, file, cb) {
        cb(null, file_name)
    }
})

const upload_File = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {

        var filetypes = /jpeg|jpg|png|pdf|mp4/;
        var mimetype = filetypes.test(file.mimetype);


        file_name = Date.now() + "." + file.mimetype.split("/")[1];


        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
    }

    // mypic is the name of file attribute
}).single("pic");

const updateWhatsApiAttachments = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body
        var { tempId, template } = req.query



        upload_File(req, res, async function (err) {
            if (err) {
                console.log("Error apiController uploadImage", err)

                res.status(500).json({ message: 'Something went wrong. Please contact customer care.' })

            }
            else {
                var result = await updateWhatsTempModel(tempId, template, file_name, grp_id, user_id)

                if (result != "Error") {
                    res.status(201).json('Template Update Sucessfully.')
                }
                else
                    res.status(500).json({ message: 'Something went wrong. Please contact customer care.' })

            }

        })



    }
    catch (error) {
        console.log("Error in apiController.js updateWhatsApiAttachments() is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}


var storageEmail = multer.diskStorage({
    destination: function (req, file, cb) {

        // Uploads is the Upload_folder_name
        cb(null, e_path)
    },
    filename: function (req, file, cb) {
        cb(null, file_name)
    }
})

const upload_EmailFile = multer({
    storage: storageEmail,
    fileFilter: function (req, file, cb) {

        var filetypes = /jpeg|jpg|png|pdf|mp4/;
        var mimetype = filetypes.test(file.mimetype);


        file_name = Date.now() + "." + file.mimetype.split("/")[1];


        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Error: File upload only supports the "
            + "following filetypes - " + filetypes);
    }

    // mypic is the name of file attribute
}).single("pic");

const updateEmailAttachments = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body
        var { tempId, template,subject } = req.query

        

        upload_EmailFile(req, res, async function (err) {
            if (err) {
                console.log("Error apiController uploadImage", err)

                res.status(500).json({ message: 'Something went wrong. Please contact customer care.' })

            }
            else {
                var result = await updateEmailTempModel(tempId, template, file_name,subject, grp_id, user_id)

                if (result != "Error") {
                    res.status(201).json('Template Update Sucessfully.')
                }
                else
                    res.status(500).json({ message: 'Something went wrong. Please contact customer care.' })

            }

        })



    }
    catch (error) {
        console.log("Error in apiController.js updateEmailAttachments() is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}

const getSettingData = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body

        var result = await getSettingModel(grp_id)

        if (result != "Error") {

            res.status(201).json(result[0])
        }
        else {
            res.status(500).json({ message: "Something Went Wrong." })
        }

    } catch (error) {
        console.log("Error in apiController.js getSettingData() is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}

const updateSetting = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body
        var { whatsCamp, emailCamp, repeatCamp } = req.query

        var result = await updateSettingModel(whatsCamp, emailCamp, repeatCamp, grp_id, user_id)

        if (result != "Error") {

            res.status(201).json("Setting Updated Sucessfully.")
        }
        else {
            res.status(500).json({ message: "Something Went Wrong." })
        }

    } catch (error) {
        console.log("Error in apiController.js updateSetting() is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}

var storageData = multer.diskStorage({
    destination: function (req, file, cb) {

        // Uploads is the Upload_folder_name
        cb(null, d_path)
    },
    filename: function (req, file, cb) {
        cb(null, file_name)
    }
})

const upload_DataFile = multer({
    storage: storageData,
    fileFilter: function (req, file, cb) {


        file_name = Date.now() + "." + "xlsx";


        /*var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }*/
        return cb(null, true)

        /* cb("Error: File upload only supports the "
             + "following filetypes - " + filetypes);*/
    }

    // mypic is the name of file attribute
}).single("pic");

/*********************************************
 * function updateDataFromExcel 
 * @function Function get the excwl data and upload this data into the Database
 * @Input @Req - @Res
 * @Output null
 * @CreatedBy : SOurabh
 * @CreatedAt : 19-08-2023
 */

const updateDatabase = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body




        upload_DataFile(req, res, async function (err) {
            if (err) {
                console.log("Error apiController uploadImage", err)

                res.status(500).json({ message: 'Something went wrong. Please contact customer care.' })

            }
            else {


                res.status(201).json('Data upload Sucessfully.')
                //Now Update this data to database.
                updateDataFromExcel(file_name, grp_id, user_id)


            }

        })



    }
    catch (error) {
        console.log("Error in apiController.js updateEmailAttachments() is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}

/*********************************************
 * function updateDataFromExcel 
 * @function Function get the excwl data and upload this data into the Database
 * @Input FIle name of excel which is export to database
 * @Output null
 * @CreatedBy : SOurabh
 * @CreatedAt : 19-08-2023
 */


function updateDataFromExcel(fName, grpId, userId) {
    try {
        const workbook = XLSX.readFile(path.join('public', 'assets', 'datafile', fName));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const data = XLSX.utils.sheet_to_json(worksheet);
        databaseModel(data, grpId, userId)
    }
    catch (error) {
        console.log("Error in apiController.js updateDatafromExcel() is : ", error)
    }

}


/*********************************************
 * function whatsAccount
 * @function Function get the Whatsapp account to the user
 * @Input @Req - @Res
 * @Output whatsapp account list
 * @CreatedBy : SOurabh
 * @CreatedAt : 19-08-2023
 */

const whatsAccount = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body
        var result = await whtasAccModel(grp_id)
        
        if(result != "Error")
        {
            res.status(201).json(result)
        }
        else
        res.status(500).json({ message: "Something Went Wrong." })

    } catch (error) {
        console.log("Error in apiController.js whatsAccount() is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}


/*********************************************
 * function whatsAccountLogout
 * @function Function get the Whatsapp account to the user
 * @Input @Req - @Res
 * @Output whatsapp account list
 * @CreatedBy : SOurabh
 * @CreatedAt : 19-08-2023
 */

const whatsAccountLogout = async (req, res) => {
    try {
        var { user_id, grp_id } = req.body
        var { accId } = req.query
        
        var result = await logoutWhatsApp(accId)
        
        if(result != "Error")
        {
            res.status(201).json(result)
        }
        else
        res.status(500).json({ message: "Something Went Wrong." })

    } catch (error) {
        console.log("Error in apiController.js whatsAccount() is :", error)
        res.status(500).json({ message: "Something Went Wrong." })
    }
}



module.exports = {
    updateWhatsTemp, getWhatsTemp, updateWhatsApiAttachments, getEmailTemp,
    updateEmailTemp, updateEmailAttachments, getSettingData, updateSetting, updateDatabase, whatsAccount,whatsAccountLogout
}