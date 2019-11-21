const url = require('url');
const qs = require('querystring');
const Comments = require('../models/comment.model');
const CommentReactors = require('../models/comment-reactors.model');

function updateLikesCount(comment_id, dislikersCount, CommentActionsIO){
    Comments.findById(comment_id, (err, comment) => {
        if(err) console.error(err);
        ++comment.likes;
        comment.dislikes = dislikersCount;  
        CommentActionsIO.emit('comment likes change', {_id: comment._id, likes: comment.likes, dislikes: comment.dislikes});
        comment.save(error => {
          if(error) console.error(error);
          return;
        });
    });
}
function updateDislikesCount(comment_id, likersCount, CommentActionsIO){
    Comments.findById(comment_id, (err, comment) => {
        if(err) console.error(err);
        comment.likes = likersCount; 
        ++comment.dislikes;
        CommentActionsIO.emit('comment dislikes change', {_id: comment._id, likes: comment.likes, dislikes: comment.dislikes});
        comment.save(error => {
          if(error) console.error(error);
          return;
        });
    });
}
module.exports = {
    addComment: (req, res) => {
        let newComment = new Comments(req.body);
        newComment.save((err, comment) => {
            if(err) console.log(err);
            else res.status(201).send(comment);
        });
    },
    fetchComment: (req, res) =>{
        const parsedRequest = url.parse(req.url);
        const parsedquery = qs.parse(parsedRequest.query);
        const discussion_id = parsedquery.discussion_id;
        const user_id = parsedquery.user_id;
        Comments.find({discussion_id: discussion_id}, null, {sort : {createdAt: 1}} ,(err, comments) => {
            if(err) console.log(err);
            if(comments !== undefined){
                for(let i = 0, size = comments.length; i < size; ++i){
                    CommentReactors.findOne({comment_id: comments[i]._id}, (error, reactors) => {
                        if(error) console.error(error);
                        //if people liked or hated the comment, determine if the person making the request is among them
                        if(reactors !== null){
                            if(reactors.likers.includes(user_id)) comments[i].liked = true;
                            else if(reactors.dislikers.includes(user_id)) comments[i].disliked = true;
                            if(i === size - 1 ) res.send(comments);
                        }
                        //else just check whether that was the last comment and if so send it
                        else if(reactors === null  && i === size - 1) res.send(comments);
                    });
                }
            }else res.send([]);//send empty array
        });
    },
    like: (req, res) => {
        const details = req.body;
        const CommentActionsIO = req.app.get('CommentActionsIO');
        CommentReactors.findOne({comment_id: details.comment_id}, (err, reactors) => {
            if(err) console.log(err);
            if(reactors){
                if(!reactors.likers.includes(details.reactorId)) reactors.likers.push(details.reactorId);
                reactors.dislikers.splice(reactors.dislikers.indexOf(details.reactorId), 1);
                updateLikesCount(details.comment_id, reactors.dislikers.length, CommentActionsIO);
                reactors.save(error => {
                    if(error) console.error(error);
                });
            }else{
                let reactors = new CommentReactors({
                    comment_id: details.comment_id
                });
                reactors.likers.push(details.reactorId);
                updateLikesCount(details.comment_id, reactors.dislikers.length, CommentActionsIO);
                reactors.save(error => {
                    if(error) console.error(error);
                });
            }
            res.status(200).end();
        });
    },
    dislike: (req, res) => {
        const details = req.body;
        const CommentActionsIO = req.app.get('CommentActionsIO');
        CommentReactors.findOne({comment_id: details.comment_id}, (err, reactors) => {
            if(err) console.log(err);
            if(reactors){
                if(!reactors.dislikers.includes(details.reactorId)) reactors.dislikers.push(details.reactorId);
                reactors.likers.splice(reactors.likers.indexOf(details.reactorId), 1);
                updateDislikesCount(details.comment_id, reactors.likers.length, CommentActionsIO);
                reactors.save(error => {
                    if(error) console.error(error);
                });
            }else{
                let reactors = new CommentReactors({
                    comment_id: details.comment_id
                });
                reactors.dislikers.push(details.reactorId);
                updateDislikesCount(details.comment_id, reactors.likers.length, CommentActionsIO);
                reactors.save(error => {
                    if(error) console.error(error);
                });
            }
            res.status(200).end();
        });
    },
    updateCommentAuthorName: (author_id, newAuthorName) =>{
        Comments.find({author_id: author_id}, (err, comments) => {
            if(err) console.log(err);
            comments.forEach(comment => {
                comment.author_name = newAuthorName;
                comment.save((error, comment) => {
                    if(error) console.log(comment); 
                });
            });
        });
    },
    updateCommentProfilePic: (author_id, newProfilePicUrl) => {
        Comments.find({author_id: author_id}, (err, comments) => {
            if(err) console.log(err);
            comments.forEach(comment => {
                comment.author_profilePic = newProfilePicUrl;
                comment.save((error, comment) => {
                    if(error) console.log(error);
                });
            });
        });
    }
};
