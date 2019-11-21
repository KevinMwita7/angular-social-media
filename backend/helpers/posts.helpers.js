const url = require('url');
const querystring = require('querystring');
const Images = require('../models/images.model');
const textPosts = require('../models/text-posts.model');
const ImagesHelpers = require('./images.helper');

module.exports = {
    search: (req, res) => {
        const SearchIO = req.app.get('SearchIO');
        const parsedRequest = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedRequest.query);
        const searchterm = parsedQuery.term;
        const searcher_id = parsedQuery.searcher_id;
        
        if(searchterm && searchterm !== undefined){
            let doneSearchingImages = false;
            let doneSearchingTextPosts = false;
            let checkifDone = setInterval(() => {
                if(doneSearchingImages && doneSearchingTextPosts){
                    res.status(200).json({'Success':'Done searching through posts'});
                    clearInterval(checkifDone);
                }
            }, 5000);
            Images.find({title: {$regex: searchterm, $options: 'i'}}).lean(true).exec((err, images) => {
                if(err) console.log(err);
                    if(images.length){
                        for(let i = 0, size = images.length; i < size ;++i){
                            if(images[i].likers.includes(searcher_id)) images[i].liked = true;
                            else images[i].liked = false;
                            SearchIO.emit('search result',images[i]);
                            if(i === size - 1) doneSearchingImages = true;
                        }
                    }else doneSearchingImages = true;
            });
            textPosts.find({title: {$regex: searchterm, $options: 'i'}}).lean(true).exec((err, text_posts) => {
                if(err) console.log(err);
                    if(text_posts.length){
                        for(let i = 0, size = text_posts.length; i < size ;++i){
                            if(text_posts[i].likers.includes(searcher_id)) text_posts[i].liked = true;
                            else text_posts[i].liked = false;
                            SearchIO.emit('search result',text_posts[i]);
                            if(i === size - 1) doneSearchingTextPosts = true;
                        }
                    }else doneSearchingTextPosts = true;
            });
        }
    }
};