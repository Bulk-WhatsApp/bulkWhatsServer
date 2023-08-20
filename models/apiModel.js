const connections = require("./dbConnModel")

const getWhatsTempModel = async (grpId) => {
    try {
        var args = [grpId]
        var result = connections.call("getWahtsTemp", args)
        result.pop()
        return result
    } catch (error) {
        console.log("Error in apiModel.js getWhatsTempModel() : ", error)
        return "Error"
    }
}

const getEmailTempModel = async (grpId) => {
    try {
        var args = [grpId]
        var result = connections.call("getEmailTemp", args)
        result.pop()
        return result
    } catch (error) {
        console.log("Error in apiModel.js getEmailTempModel() : ", error)
        return "Error"
    }
}

const updateWhatsTempModel = async (tempId, template, attachment, grpId, userId) => {
    try {
        var args = [tempId, template, attachment, grpId, userId]
        var result = connections.call("update_whatstemp", args)
        return result
    } catch (error) {
        console.log("Error in apiModel.js updateWhatsTempModel() : ", error)
        return "Error"
    }
}

const updateEmailTempModel = async (tempId, template, attachment,subject, grpId, userId) => {
    try {
       
        var args = [tempId, template, attachment, grpId, userId,subject]
        var result = connections.call("update_emailtemp", args)
        return result
    } catch (error) {
        console.log("Error in apiModel.js updateEmailTempModel() : ", error)
        return "Error"
    }
}

const getSettingModel = async (grpId) => {
    try {
        var args = [grpId]
        var result = connections.call("getSettingData", args)
        result.pop()
        return result
    } catch (error) {
        console.log("Error in apiModel.js getSettingModel() : ", error)
        return "Error"
    }
}

const updateSettingModel = async (whatsCamp, emailCamp, repeatCamp, grp_id, user) => {
    try {
        var args = [whatsCamp, emailCamp, repeatCamp, grp_id, user]
        var result = connections.call("updateSetting", args)
        result.pop()
        return result
    } catch (error) {
        console.log("Error in apiModel.js updateSettingModel() : ", error)
        return "Error"
    }
}

/*********************************************
 * function updateDataFromExcel 
 * @function Function upload data to the database
 * @Input Data - Candidate name mobile no and email JSONArray, grpId - GrpId of data, userId
 * @Output null
 * @CreatedBy : SOurabh
 * @CreatedAt : 19-08-2023
 */

const databaseModel = (data, grpId, userId) => {
    try {
        data.forEach(element => {

            try {
                connections.call("addBulkData", [element.CandidateName,
                element.MobileNo,
                element.EmailId,
                    grpId, userId])
            }
            catch (error) {
                console.log("Error in apiModel.js databaseModel() is : ", error)
            }

        })
    } catch (error) {
        console.log("Error in apiModel.js databaseModel() is : ", error)
    }
}

/*********************************************
 * function whtasAccModel 
 * @function Function get whatsAcc from the database
 * @Input grpId - GrpId of data, userId
 * @Output null
 * @CreatedBy : SOurabh
 * @CreatedAt : 19-08-2023
 */

const whtasAccModel = async (grpId) => {
    try {
        var result = connections.call("getWhatsAccgrp",[grpId])
        result.pop()
        return result


    } catch (error) {
        console.log("Error in apiModel.js whtasAccModel() is: ", error)
        return "Error"
    }

}

module.exports = {
    getWhatsTempModel, updateWhatsTempModel, getEmailTempModel, updateEmailTempModel,
    getSettingModel, updateSettingModel, databaseModel, whtasAccModel
}