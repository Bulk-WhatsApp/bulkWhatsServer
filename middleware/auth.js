const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {

    try {


        let token = req.headers.authorization
        

        if (token) {
            token = token.split(" ")[1]

            let user = jwt.verify(token, process.env.MY_KEY)

            
           

            if (user.user_id) {
                
                req.body.user_id = user.user_id
                req.body.grp_id = user.grp_id
                
                next()
            }
            else {
                res.status(401).json({ message: "Unauthorize User" })
            }



        }
        else {
            res.status(401).json({ message: "Unauthorize User" })
        }


    }
    catch (error) {
        console.log("Error in auth.js is " + error)
        res.status(401).json({ message: "Unauthorize User" })

    }
}

const authSocket = (authToken) => {

    try {

        let token = "Bearer "+authToken
        
        if (token) {
            token = token.split(" ")[1]
            

            let user = jwt.verify(token, process.env.MY_KEY)

            return user

           



        }
        else {
            return false
            
        }


    }
    catch (error) {
        console.log("Error in  auth.js authSocket() : ",error)
        return false

    }
}


module.exports = {auth,authSocket};