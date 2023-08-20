const connections = require("./dbConnModel")
const bcrypt = require('bcrypt')

const signReqModel = async(mobNo)=>{
    try {
        var result = connections.query("call loginReq('"+mobNo+"')")
        
        return result[0]

    } catch (error) {
        console.log("Error in userModel.js signReqModel() is " + error)
        return "Error"
    }
}
const signInModel = async(mobNo,devToken,firebaseToken)=>{
    try {
        var result = connections.query("call userLogIn('"+mobNo+"','"+ await bcrypt.hash(devToken, 10)+"','"+firebaseToken+"')")
        
        return result[0][0]

    } catch (error) {
        console.log("Error in userModel.js signReqModel() is " + error)
        return "Error"
    }
}

module.exports = {signReqModel,signInModel}