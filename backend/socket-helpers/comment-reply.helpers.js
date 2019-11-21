const CommentReply = require('../models/comment-reply.model');
const Comments = require('../models/comment.model');

function onCommentReply(io, reply){
    let newReply = new CommentReply({
        parent_id: reply.parent_id,
        author_id: reply.author_id,
        author_name: reply.author_name,
        author_profilePic: reply.author_profilePic,
        text: reply.text
    });
    Comments.findById(reply.parent_id, (err, comment) => {
        if(err) console.error(err);
        comment.repliesAmount += 1;
        io.emit('replies count change', comment.repliesAmount);
        comment.save((error, cmt) => {
            if(error) console.error(error);
        });
    });
    newReply.save((err, reply) => {
        if(err) console.error(err);
        io.emit('comment reply', reply);
    });
}

module.exports.onCommentReply = onCommentReply;
