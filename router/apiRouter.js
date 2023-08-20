const express  = require("express");
const { updateWhatsTemp, getWhatsTemp, updateWhatsApiAttachments, getEmailTemp, updateEmailTemp, updateEmailAttachments, getSettingData, updateSetting, updateDatabase, whatsAccount, whatsAccountLogout } = require("../controller/apiController");
const { auth } = require("../middleware/auth");

const apiRouter = express.Router();



apiRouter.post("/UpdateWhatsTemp",auth, updateWhatsTemp)
apiRouter.post("/updateEmailTemp",auth, updateEmailTemp)

apiRouter.post("/getWhatsTemp",auth, getWhatsTemp)
apiRouter.post("/getEmailTemp",auth, getEmailTemp)

apiRouter.post("/updateWhatsApiAttachments",auth, updateWhatsApiAttachments)
apiRouter.post("/updateEmailAttachments",auth, updateEmailAttachments)


apiRouter.post("/getSettingData",auth, getSettingData)
apiRouter.post("/updateSetting",auth, updateSetting)


apiRouter.post("/updateDatabase",auth, updateDatabase)


apiRouter.get("/getWhatsAcc",auth, whatsAccount)
apiRouter.get("/logoutWhats",auth, whatsAccountLogout)



module.exports = apiRouter