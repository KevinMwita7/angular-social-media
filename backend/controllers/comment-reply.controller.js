const CommentReplies = require('../models/comment-reply.model');
const Accounts = require('../models/account.model');

module.exports = {
    addReply: (req, res) => {
        let newReply = new CommentReplies(req.body);
        newReply.save((error, reply) => {
            if(error) console.log(error);
            res.send(reply);
        });
    },
    fetchReplies: (req, res) => {
        CommentReplies.find({parent_id: req.params.parent_id}, null,{sort : {createdAt: 1}} , (err, replies) => {
            if(err) console.log(err);
            res.send(replies);
        });
    },
    updateRepliesAuthorName: (user_id, newAuthorName) =>{
        CommentReplies.find({author_id: user_id}, (err, replies) => {
            if(err) console.log(err);
            replies.forEach(reply => {
                reply.author_name = newAuthorName;
                reply.save((error, reply) => {
                    if(error) console.log(error);
                });
            });
        });
    },
    updateRepliesProfilePic: (author_id, newProfilePicUrl)=>{
        CommentReplies.find({author_id: author_id}, (err, replies) => {
            if(err) console.log(err);
            replies.forEach(reply => {
                reply.author_profilePic = newProfilePicUrl;
                reply.save((error, reply) => {
                    if(error) console.log(error);
                });
            });
        });
    }
};