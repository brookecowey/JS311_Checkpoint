
let db = require("../model/db");
let argon = require("argon2");

let jwt = require("jsonwebtoken");


let registerUser = async function(req, res){
    let email = req.body.email;
    let password = req.body.password;
    
    if(!email){
        res.status(400).json("Email is required");
        return;
    }
    try{
    hash = await argon.hash(password);
    }catch(err){
        console.log("Failed to hash the password", err);
        res.sendStatus(500);
        return;
    }


    let sql = "insert into Users (email, pswrd) values (?, ?)";
    let params = [email, hash];

    db.query(sql, params, function(err, results){
        if(err){
        console.log("Failed to register user", err);
        res.sendStatus(500);
    } else {
        res.sendStatus(204);
    }
    });
};

let loginUser = function(req, res){
    // get email and password from request
    // generate has from password
    // fetch the stored hash for the email from database
    // if user exists in database, check stored hash against the generate hash
                    // to decide if the login failed or not
    // if user does not exist, failed to login

    let email = req.body.email;
    let password = req.body.password;

    let sql = "select email, pswrd from Users where email = ?";
    let params = [email];

    db.query(sql, params, async function(err, results){
        let storedHash;
        let storedId;

        if(err){
            console.log("Failed to fetch hash for user", err);
        } else if (results.length > 1){
            console.log("Returned more than 1 user for the email", email);
        } else if (results.length == 1){
            storedHash = results[0].pswrd
            storedId = results[0].id
        }  else if (results.length == 0) {
            console.log("Did not find user or email", email);
        }
            try {
        let pass = await argon.verify(storedHash, password);
        if(pass){
            // res.sendStatus(204);
            //(new) we will generate token and send it back
            let token = {
                id: storedId,
                email: email
            };
            //token is good for 24 hours (84600 seconds)
            let signedToken = jwt.sign(token, process.env.JWT_SECRET, {expiresIn: 86400});
            res.json(signedToken);
        } else {
            res.sendStatus(401);
        }
    } catch(err){
        console.log("Failed when verifying hash", err);
    }
    });



};

module.exports = {
    registerUser,
    loginUser
}