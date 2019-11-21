const Images = require('../models/images.model');
const ImagesHelper = require('../helpers/images.helper');
const Accounts = require('../models/account.model');
const  IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const path = require('path');
//handle errors appropriately
//modulrize the parts for saving files starting from if(extension)

module.exports = {
	create: (req, res)=>{
		let form = new IncomingForm();
		form.on('file',(field, file) => {
			//move file to desired location after accessing it via  file.path
			let extension = path.extname(file.name);
			let tempPath = file.path;
			let imgUrl = ImagesHelper.rename();
			let targetPath = path.resolve(`./public/uploads/${req.params.user_id}/${imgUrl}${extension}`);
			fs.exists(path.resolve(`./public/uploads/${req.params.user_id}`), (exists) => {
				if(exists){
					//do not make a new directory
					if (extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.gif') {
						fs.rename(tempPath, targetPath, (err) => {
							const invalidDescription = /(^no\sdescriptions*$)|(^no\stitles*$)/i;
							if(err) throw new Error(`Error while moving folder ${file.path}`);
								Accounts.findOne({owner: req.params.user}, (err, account) => {
									if(err) console.log(err);
									let newImage = new Images({
										filename: imgUrl + extension,
										title: invalidDescription.test(req.params.title)? '' : req.params.title.trim(),
										description: invalidDescription.test(req.params.description)? '' : req.params.description,
										uploader_id: account.owner_id,
										uploader: account.owner,
										uploaderProfilePic: account.profilePic,
										url: `http://localhost:4000/public/uploads/${req.params.user_id}/${imgUrl}${extension}`,
										path: targetPath
									});
									newImage.save((_err, image) =>{
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
					//make directory
					fs.mkdir(path.resolve(`./public/uploads/${req.params.user_id}`), (err) => {
						if (err) console.log(err);
					});
					if (extension === '.png' || extension === '.jpg' || extension === '.jpeg' || extension === '.gif') {
						fs.rename(tempPath, targetPath, (err) => {
							let invalidDescription = /(^no\sdescriptions*$)|(^no\stitles*$)/i;

							if(err) throw new Error(`Error while moving folder ${file.path}`);

								if(err) console.log(err);
								Accounts.findOne({owner: req.params.user}, (err, account) => {
									if(err) console.log(err);
									let newImage = new Images({
										filename: imgUrl + extension,
										title: invalidDescription.test(req.params.title) || req.params.title == ''  ? '' : req.params.title.trim(),
										description: invalidDescription.test(req.params.description) ? '' : req.params.description,
										uploader_id: account.owner_id,
										uploader: account.owner,
										uploaderProfilePic: account.profilePic,
										url: `http://localhost:4000/public/uploads/${req.params.user_id}/${imgUrl}${extension}`,
										path: targetPath
									});
	
									newImage.save((_err, image) =>{
											if(_err){
												console.error(_err);
												fs.unlink(targetPath, unlinkError => {
													if(unlinkError) console.error(unlinkError);
												});
											}
									});
								});	
							});
					}else{
						fs.unlink(tempPath, ()=>{
							console.log('Invalid file');
						});
						
					}
				}
			});
		});

		form.on('end', () => {
			res.json({'message':'done uploading'});
		});
		form.parse(req);
	},
	fetchImageUploads: function(req, res){
			Images.find({uploader_id: req.params.uploader_id}, (err, images) => {
				if(err) console.log(err);
				res.send(images);
			});
	},
	like: function(req, res){
		const io = req.app.get('io');
		Images.findById(req.body._id, (err, image) => {
			if(err) console.log(err);
			if(image){
				if(!image.likers.includes(req.body.liker)){
					++image.likes;
					image.likers.push(req.body.liker);
					io.emit('content likes change', {
						_id: image._id,
						likes: image.likes
					});
					image.save(_err => {
						if(_err) console.error(_err);
						res.setHeader('Content-Type', 'application/json');
						res.status(200).json({"Success": "Likes successfully updated"});		
					});
				}	
			}else console.log('Could not find image in database');
		});
	},
	unlike: function(req, res){
		const io = req.app.get('io');
		Images.findById(req.body._id, (err, image) => {
			if(err) console.log(err);
			if(image){
				if(image.likers.includes(req.body.liker)){
					--image.likes;
					io.emit('content likes change', {
						_id: image._id,
						likes: image.likes
					});
					image.likers.splice(image.likers.indexOf(req.body.liker), 1);
					image.save(_err => {
						if(_err) console.error(_err);
						res.setHeader('Content-Type', 'application/json');
						res.status(200).json({"Success": "Likes successfully updated"});		
					});
				}	
			}else console.log('Could not find image in database');
		});
	},
	delete: function(req, res){
		Images.findByIdAndDelete(req.body.imageId);
	}
};