const fs = require('fs');
const path = require('path');
const AccountsModel = require('../models/account.model');
const CredentialsModel = require('../models/credentials.model');
const ProfilePicturesModel = require('../models/profile-picture.model');
const imagesModel = require('../models/images.model');
const CommentsController = require('../controllers/comments.controller');
const CommentReplies = require('../controllers/comment-reply.controller');

function newUrl(oldUrl, newUsername){
    let mutilatedUrl = oldUrl.split('/');
    mutilatedUrl[6] = newUsername;
    return mutilatedUrl.join('/');
}
function renameUploadsFolder(oldUsername, newUsername){
    let targetPath = path.resolve(`../artsy/public/uploads/${newUsername}`);
    let oldPath = path.resolve(`../artsy/public/uploads/${oldUsername}`);
    fs.rename(oldPath, targetPath, (err)=>{
        if(err) console.log(err);
    });
}

module.exports = {
    //determine uniqueness of the username first
    //update the accounts and images appropriately
    changeProfile: function(req, res){
        if(req.body.email || req.body.username ){
            if(req.body.username){
                //ensure username is unique
                CredentialsModel.findOne({username: req.body.username}, (err, duplicateCredentials) => {
                    if(err) console.log(err);
                    if(duplicateCredentials) {
                        res.json({"Failure":"Username already taken"});
                    }
                    else{
                        CredentialsModel.findById(req.params._id, (error, credentials) => {
                            if(error) console.log(error);
                            credentials.username = req.body.username;
                            if(req.body.email) credentials.email = req.body.email;
                            const token = credentials.generateJwt();
                            res.status(200).json({'token':token});
                            credentials.save((error, credentials) => {
                            if(error) console.log(error);
                            });
                        });
                        AccountsModel.findOne({owner_id: req.params._id}, (error, account) => {
                            if(error) console.log(error);
                            account.owner = req.body.username;
                            account.save((_error, account) => {
                                if(_error) console.log(_error); 
                            });
                        });
                        imagesModel.find({uploader_id: req.params._id}, (error, images) => {
                            if(error) console.log(error);
                            for(let i = 0, size = images.length; i < size; ++i){
                                images[i].uploader = req.body.username;
                                images[i].save((_err, image) => {
                                    if(_err) console.log(_err);
                                });
                            }
                        });
                        ProfilePicturesModel.find({uploader_id: req.params._id}, (error, profilePictures) => {
                            if(error) console.log(error);
                            for(let i = 0, size = profilePictures.length; i < size; ++i){
                                profilePictures[i].save((_err, profilePicture) => {
                                    if(_err) console.log(_err);
                                });
                            }
                        });
                        CommentsController.updateCommentAuthorName(req.params._id, req.body.username);
                        CommentReplies.updateRepliesAuthorName(req.params._id, req.body.username);
                    }
                });
            }else{
                //if only email is being changed
                if(req.body.email){
                    CredentialsModel.findById(req.params._id, (err, credentials) => {
                        if(err) console.log(err);
                        credentials.email = req.body.email;
                        credentials.save((error, credentials) => {
                            if(error) console.log(error);
                        });
                    });
                }
            }
        }

        if(req.body.bio){
            AccountsModel.findOne({owner_id: req.params._id}, (err, account) => {
                if(err) console.error(err);
                if(req.body.bio) account.bio = req.body.bio;
                account.save(_err => {
                    if(_err) console.error(_err);
                });
            });
        }
    }
};