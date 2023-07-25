let express = require("express");

let router = express.Router;

let authsMiddleware = require("../middleware/auths");

//requires the client to be authenticated
router.get("/handshake", authsMiddleware.checkJWT, function(req, res){

  //get the jwt from the client, make sure it's valid

  let userID = req.userinfo.id;
  
  res.json('Welcome back #${userId}!');
})

router.get("/getBalance", authsMiddleware.checkJWT, controller.getBalance);
module.exports = router;