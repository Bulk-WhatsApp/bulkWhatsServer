const connections = require("./dbConnModel")

const getCronJobModel = async()=>
{
    try {
        var result = connections.query("call getCronData()")

        result.pop()
        return result
        
    } catch (error) {
        console.log("Error in cronModel.js getCronJobModel() is : ",error)
        return "Error"
    }
}

const getMobnoModel = async(grpId)=>{
    try {
        var result = connections.query("call getaccMobno('"+grpId+"')")

        
        return result[0]
        
    } catch (error) {
        console.log("Error in cronModel.js getMobno() is : ",error)
        return "Error"
    }
}

const msgSendModel = async(mobNo,grpId)=>{
    try {
        var result = connections.query("call msgSent('"+mobNo+"','"+grpId+"')")

        
        return result[0]
        
    } catch (error) {
        console.log("Error in cronModel.js msgSendModel() is : ",error)
        return "Error"
    }
}
const getEmailIdModel = async(grpId)=>{
    try {
        var result = connections.query("call getaccEmailId('"+grpId+"')")

        
        return result[0]
        
    } catch (error) {
        console.log("Error in cronModel.js getMobno() is : ",error)
        return "Error"
    }
}

const emailSendModel = async(emailId,grpId)=>{
    try {
        var result = connections.query("call emailSent('"+emailId+"','"+grpId+"')")

        
        return result[0]
        
    } catch (error) {
        console.log("Error in cronModel.js emailSendModel() is : ",error)
        return "Error"
    }
}
module.exports = {getCronJobModel,getMobnoModel,msgSendModel,getEmailIdModel,emailSendModel}