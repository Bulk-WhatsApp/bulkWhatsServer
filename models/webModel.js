const connections = require("./dbConnModel")

const getAccountList = async()=>{
    try {

        var result  = connections.query("call getWhatsAcc()")
        result.pop()
        
        return result[0]
        
    } catch (error) {
        console.log("Error in webWhatsModel.js getAccountList() is ",error)
        return "Error"
        
    }
}

const authWhatsAppModel = async(userId,act)=>{
    try {
        var args = [ userId,act]
        connections.call("updateWhtasStatus",args)
    } catch (error) {
        console.log("Error in webWhatsModel.js authWhatsAppModel() is ",error)
        return "Error"
    }
}


module.exports = {getAccountList,authWhatsAppModel}