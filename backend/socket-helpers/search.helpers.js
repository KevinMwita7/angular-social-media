const url = require('url');
const qs = require('querystring');
const Images = require('../models/images.model');

function onQuery(socket, query){
    let parsedUrl = url.parse(socket.handshake.headers.referer);
    const parsedQuery = parsedUrl.query;
    const searchTerm = parsedQuery.split('=')[1];
    let searcher_id = query.updates[1].value;
    Images.find({title: {$regex: searchTerm, $options: 'i'}}).lean(true).exec((err, images) => {
        if(err) console.log(err);
            if(images.length){
                images.forEach(image => {
                    if(image.likers.includes(searcher_id)) image.liked = true;
                    else image.liked = false;
                    socket.emit('image search result', image);
                });
            }else socket.emit('image search result',images);
    });
}
module.exports.onQuery = onQuery;