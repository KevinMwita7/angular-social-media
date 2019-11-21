const IncomingForm =require('formidable');
const md5 = require('md5');
const fs =require('fs');
const path = require('path');
const qs = require('querystring');
const url = require('url');
const Images = require('../models/images.model');
const Accounts = require('../models/account.model');
const ProfilePicture = require('../models/profile-picture.model');
const ProfilePictureHelpers = require('../helpers/profile-pictures.helpers');
const CommentsController = require('../controllers/comments.controller');
const CommentReplies = require('../controllers/comment-reply.controller');

module.exports = {
    //return an array of images 
    trickle(req, res){
        Images.find({},{__v: 0, updatedAt:0, likers: 0, filename: 0}, {timestamp: -1}).limit(1000).lean(true).exec((err, images) => {
            if(err) console.log(err);
           	res.send(images);
		});
	},
	//rebuild search handler
    search(req, res){
        Images.find({title: {$regex: req.params.searchterm, $options: 'i'}}).lean(true).exec((err, images) => {
			if(err) console.log(err);
				if(images.length){
					for(let i = 0, size = images.length; i < size ;++i){
						if(images[i].likers.includes(req.params.searcher_id)) images[i].liked = true;
						else images[i].liked = false;
						if(i === size - 1) res.send(images);
					}
				}else res.send(images);
        });
	},
	browsePageSearch(req, res){
		let parsedRequest = url.parse(req.url);
		let parsedquery = qs.parse(parsedRequest.query);
		const searchterm = parsedquery.term;
		if(searchterm){
			Images.find({title: {$regex: searchterm, $options: 'i'}}).lean(true).exec((err, images) => {
				if(err) console.log(err);
				res.send(images);
			});
		}
	},
    getImagesFeed(req, res){
        
    },
    rename:() =>{
        var possible = 'abcdefghijklmnopqrstuvwxyz0123456789',
        imgUrl = '';
     for(var i=0; i < 8; i+=1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
     }

    imgUrl += Date.now();
    
    return imgUrl;
    },
    setProfilePicture: (req, res)=>{
        let form = new IncomingForm();
		form.parse(req);        
		form.on('file',(field, file) => {
			let extension = path.extname(file.name);
			let tempPath = file.path;
			let imgUrl = md5(file.name) + Date.now();
			let targetPath = path.resolve(`./public/uploads/${req.params.user_id}/${imgUrl}${extension}`);
			fs.exists(path.resolve(`./public/uploads/${req.params.user_id}`), (exists) => {
				let url = `http://localhost:4000/public/uploads/${req.params.user_id}/${imgUrl}${extension}`;
				if(exists){
					if (extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.gif') {
						fs.rename(tempPath, targetPath, (err) => {
							if(err) throw new Error(`Error while moving folder ${file.path}`);
								if(err) console.log(err);
								Accounts.findOne({owner_id: req.params.user_id}, (err, account) => {
									if(err) console.log(err);
									let newProfilePicture = new ProfilePicture({
										filename: imgUrl + extension,
										uploader_id: account.owner_id,
										url: url,
										path: targetPath
									});
                                    account.profilePic = url;
                                    account.save(_err => {
                                        if(_err) console.log(_err);
									});
									ProfilePictureHelpers.updateImagesUploaderProfilePic(req.params.user_id, url);
									CommentReplies.updateRepliesProfilePic(req.params.user_id, url);
									CommentsController.updateCommentProfilePic(req.params.user_id, url);
									newProfilePicture.save((_err, image) =>{
										if(_err) {
											console.error(_err);
											fs.unlink(targetPath, unlinkError => {
												if(unlinkError) console.error(unlinkError);
											});
										}
									});
								});
							});													
					}else{
						fs.unlink(tempPath, () => {
							console.log('Invalid file');
						});						
					}
				}else{
					fs.mkdir(path.resolve(`./public/uploads/${req.params.user_id}`), (err) => {
						if (err) console.log(err);
					});
					if (extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.gif') {
						fs.rename(tempPath, targetPath, (err) => {
							if(err) throw new Error(`Error while moving folder ${file.path}`);
								if(err) console.log(err);
								let url = `http://localhost:4000/public/uploads/${req.params.user_id}/${imgUrl}${extension}`;
								Accounts.findOne({owner_id: req.params.user_id}, (err, account) => {
									if(err) console.log(err);
									let newProfilePicture = new ProfilePicture({
										filename: imgUrl + extension,
										uploader_id: account.owner_id,
										url: url,
										path: targetPath
									});
                                    
                                    account.profilePic = url;
                                    account.save(function (_err) {
                                        if(_err) console.log(_err);
									});
									ProfilePictureHelpers.updateImagesUploaderProfilePic(req.params.user_id, url);
									CommentReplies.updateRepliesProfilePic(req.params.user_id, url);
									CommentsController.updateCommentProfilePic(req.params.user_id, url);
									newProfilePicture.save(function (_err, image) {
											if(_err){
												console.error(_err);
												fs.unlink(targetPath, function(unlinkError) {
													if(unlinkError) console.error(unlinkError);
												});
											}
									});
								});	
							});
					}else{
						fs.unlink(tempPath, function(){
							console.log('Invalid file');
						});
						
					}
				}
			});
		});
		form.on('end', function() {
			res.json({'message':'done uploading'});
		});
	},
	getProfilePicture: (req, res) => {
		Accounts.findOne({owner_id: req.params.user_id}, {_id:0,owner_id:0,preferences:0,bio:0, owner:0,createdAt:0,updatedAt:0,__v:0}, 
			(err, profilePic) => {
			if(err) console.error(err);
			res.status(200).send(profilePic);
		});
	}
}; 