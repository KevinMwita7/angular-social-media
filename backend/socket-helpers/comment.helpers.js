const Comments = require('../models/comment.model');
const Images = require('../models/images.model');

function onImageComment(io, comment){
    let newComment = new Comments({
        discussion_id: comment.discussion_id,
        author_id: comment.author_id,
        author_profilePic: comment.author_profilePic,
        author_name: comment.author_name,
        text: comment.text
    });
    
    Images.findById(comment.discussion_id, (err, image) => {
        if(err) console.error(err);
        image.commentsAmount += 1;
        io.emit('comments count change', {image_id: image._id, commentsAmount: image.commentsAmount});
        image.save((error, img) => {
            if(err) console.error(error);
        });
    });
    newComment.save((err, comment) => {
    if(err) console.log(err);
    else {
        io.emit('image comment',comment);
    }
  });
}
module.exports.onImageComment = onImageComment;
