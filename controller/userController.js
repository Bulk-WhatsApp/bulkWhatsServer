//const { signReqModel, signInModel } = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { signReqModel, signInModel } = require('../models/userModel')

const signInReq = async(req,res)=>{
   
    try {
        var {devToken,mobNo} = req.body
        var result = await signReqModel(mobNo)
        if(result !="Error")
        {
            if(result.length > 0)
            {
                if(result[0].dev_token != null && result[0].dev_token != "")
                {
                   
                    if(await bcrypt.compare(devToken,result[0].dev_token))
                    {
                        var mobile_otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                        
                        var userResult = {
                            mobNo:result[0].mob_no,
                            otp: mobile_otp
                        }
                        console.log(userResult)
                        res.status(201).json(userResult)
                    }
                    else
                    {
                        res.status(500).json({ message: "Something Went Wrong." })  
                    }
                }
                else{
                    var mobile_otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                    var userResult = {
                        mobNo:result[0].mob_no,
                        otp: mobile_otp
                    }
                    console.log(userResult)
                    res.status(201).json(userResult)
                }
            }
            else{
                res.status(500).json({ message: "Something Went Wrong." })  
            }
        }
        else
        {
            res.status(500).json({ message: "Something Went Wrong." })
        }
    } catch (error) {
       console.log("Error in userController.js signInReq() is "+error)
       res.status(500).json({ message: "Something Went Wrong." }) 
    }
}
const signIn = async(req,res)=>{
    try {
       
    
        var {mobNo,devToken,firebaseToken} = req.body
        var result = await signInModel(mobNo,devToken,firebaseToken)
        
        if(result !="Error")
        {
            
            const token = jwt.sign({  user_id: result["id"],grp_id: result["grp_id"]}, process.env.MY_KEY)

           
            var userResult = {
                devToken:token,
                user_id: result["id"],
                grp_id: result["grp_id"]
            }



            res.status(201).json(userResult)
        }
        else
        {
            res.status(500).json({ message: "Something Went Wrong." })
        }
    } catch (error) {
       console.log("Error in userController.js signIn() is "+error)
       res.status(500).json({ message: "Something Went Wrong." }) 
    }
}

module.exports = {signInReq,signIn}