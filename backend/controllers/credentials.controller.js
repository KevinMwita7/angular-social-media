const Credentials = require('../models/credentials.model');
const Account = require('../models/account.model');
const Bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
 addUser: function(req, res){

    Bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if(err) console.log(err);
        req.body.password = hash;
        let newUser = new Credentials({
            email: req.body.email,
            username: req.body.username,
            hash: req.body.password
        });

        let associatedAccount = new Account({
            owner: req.body.username,
            owner_id: newUser._id
        });

        associatedAccount.save(err => {
            if (err) console.error(err);
        });

        newUser.save(err => {
            if(err){
                res.status(400).send('Failed to add new user');
                return;
            }
            let token = newUser.generateJwt();
            res.status(200).json({'token': token});
        });
    });
},

 login: function(req, res){
     // If no user ID exists in the JWT return a 401
        if(/\S+@\S+\.\S+/.test(req.body.username)){
            Credentials.findOne({"email": req.body.username}, (error, user) => {
                if(error) console.log(error);
                if(user){
                    Bcrypt.compare(req.body.password, user.hash, (err, result) => {
                        if(err) console.log(err);
                        //result is a boolean
                        else if(result){
                        let token = user.generateJwt();
                        res.status(200).json({'token': token});
                        }else if(!result) res.status(400).send('Wrong Password');
                    });
                }else{
                    res.status(401).send('User not found');
                }    
            });
         }else{
             let username = `\\b${req.body.username}\\b`;
             let regex = new RegExp(username);
            Credentials.findOne({username: {$regex: regex, $options: 'i'}}, (error, user) => {
                if(error) res.status(404).json(error);
                 if(user){
                    Bcrypt.compare(req.body.password, user.hash, (err, result) => {
                        if(err) console.error(err);
                        //result is a boolean
                        else if(result){
                            let token = user.generateJwt();
                            res.status(200).json({'token': token});
                        }else if(!result) res.status(400).send('Wrong Password');                        
                    });
                 }else res.status(401).send('User not found');   
            });
         }  
 },

 profileRead: function(req, res){
 // If no user ID exists in the JWT return a 401
 if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    Credentials
      .findById(req.payload._id, {hash: 0})
      .exec((err, user) => {
          if(err) console.log(err);
        res.status(200).json(user);
      });
  }
},

 remove: function(req, res){
     if(!req.payload._id){
         res.status(401).json({
            "message" : "UnauthorizedError: private profile"
         });
     }
    Credentials.findByIdAndRemove(req.params._id, (err, user) => {
        if(err)res.json(err);
        else res.json({'report': `successfully removed ${user.username} id: ${user._id}`});
    });
 },

 update: function(req, res, next){
     if(!req.payload._id){
         res.status(401).json({
            "message" : "UnauthorizedError: private profile"
         });
     }
     Credentials.findById(req.params._id, (err, user) => {
        if(err) console.error(err);
            Bcrypt.compare(req.body.oldPassword, user.hash, (_err, same) => {
                if(_err) console.log(_err);
                if(!same){
                    res.setHeader('content-type', 'text/plain');
                    res.write('Current password does not match what was provided.');
                    res.end();
                }else{
                    Bcrypt.hash(req.body.newPassword, saltRounds, (_err, hash) => {
                        if(_err) console.log(_err);
                        user.hash = hash;
                        user.save(err => {
                            if(err) console.error(err);
                            res.status(200).send('Successfully updated credentials');
                        });
                    });
                }
            });
     });
 },
};
