const url = require('url');
const qs = require('querystring');
const Accounts = require('../models/account.model');
const TextPost = require('../models/text-posts.model');

module.exports = {
    addTextPost(req, res){
        let newPost = new TextPost({
            uploader_id: req.body.uploader_id,
            uploader: req.body.uploader,
            title: req.body.title,
            description: req.body.description
        });
        Accounts.findOne({owner_id: req.body.uploader_id}, (err, account) => {
            if(err) console.error(err);
            newPost.uploaderProfilePic = account.profilePic;
            newPost.save(error => {
                if(error) console.error(error);
            });
            res.status(201).json({'Success':'Text successfully posted.'});
        });
    },
    search(req, res){
        const parsedRequest = url.parse(req.url);
        const parsedQuery = qs.parse(parsedRequest.query);
        const searchterm = parsedQuery.term;
        if(searchterm){
			textPosts.find({title: {$regex: searchterm, $options: 'i'}}).lean(true).exec((err, posts) => {
				if(err) console.log(err);
				res.send(posts);
			});
		}
    },
    like(req, res){
        const io = req.app.get('RealTimePostStatsIO');
        TextPost.findById(req.body._id, (err, post) => {
            if(err) console.error(err);
            else if(post){
                if(!post.likers.includes(req.body.liker)){
                    post.likers.push(req.body.liker);
                    ++post.likes;
                    io.emit('content likes change', {
                        _id: post._id,
                        likes: post.likes
                    });
                    post.save((error, upToDatePost) => {
                        if(error) console.log(error);
                        res.status(204);
                    });
                }
            }
        });
    },
    unlike(req, res){
        const io = req.app.get('RealTimePostStatsIO');
      TextPost.findById(req.body._id, (err, post) => {
        if(err) console.error(err);
        else if(post){
            if(post.likers.includes(req.body.liker)){
               post.likers.splice(req.body.liker);
               --post.likes;
               io.emit('content likes change', {
                _id: post._id,
                likes: post.likes
            });
               post.save((error, upToDatePost) => {
                   if(error) console.error(error);
                   res.status(204);
               }); 
            }
        }
      });  
    }
};