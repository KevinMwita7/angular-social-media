const Credentials = require('../controllers/credentials.controller');
const Images = require('../controllers/images.controller');
const Account = require('../controllers/account.controller');
const ImageHelper = require('../helpers/images.helper');
const SearchUserHepler = require('../helpers/search-users.helpers');
const CredentialsHelpers = require('../helpers/credentials.helpers');
const PostsHelpers = require('../helpers/posts.helpers');
const Subscriptions = require('../controllers/subscriptions.controller');
const LocationController = require('../controllers/location.controller');
const CommentController = require('../controllers/comments.controller');
const CommentReplyController = require('../controllers/comment-reply.controller');
const TextPostsController = require('../controllers/text-posts.controller');
const ChatController = require('../controllers/chat.controller');
const jwt = require('express-jwt');

module.exports = {
    defineRoutes: (app) => {
        let auth = jwt({
            secret: 'SECRET',
            userProperty: 'payload'
        });
        // Catch unauthorised errors
        app.use(function (err, req, res, next) {
            if (err.name === 'UnauthorizedError') {
            res.status(401);
            res.json({"message" : err.name + ": " + err.message});
            }
        });
        app.get('/browse/images', ImageHelper.trickle);
        app.get('/profile', auth, Credentials.profileRead);
        app.get('/account/:owner_id', auth, Account.fetchAccount); 
        app.get('/browse/search', ImageHelper.browsePageSearch);
        app.get('/uploads/images/:uploader_id', auth, Images.fetchImageUploads);
        app.get('/search/users', auth, SearchUserHepler.searchUsers);
        app.get('/search/posts', auth, PostsHelpers.search);
        app.get('/following/:username/getall', auth, Subscriptions.getPeopleFollowed);
        app.get('/followers/:leader/getall', auth, Subscriptions.getFollowers);
        app.get('/:username/feed/images', auth, ImageHelper.getImagesFeed);
        app.get('/comment/get', auth, CommentController.fetchComment);
        app.get('/commentreplies/get/:parent_id', auth, CommentReplyController.fetchReplies);
        app.get('/addresses/:owner_id', auth, LocationController.fetchCity);
        app.get('/profilepicture/:user_id', auth, ImageHelper.getProfilePicture);
        app.get('/privateconversations', auth, ChatController.getConversations);
        app.get('/privatemessages', auth, ChatController.getMessages);
        app.get('/privatemessages/all', auth, ChatController.getAllMessages);
        app.get('/chat/friends', auth, ChatController.getFriendsList);
        app.post('/login', Credentials.login);
        app.post('/register', Credentials.addUser);
        app.post('/post/images/:user/:user_id/:title/:description', auth, Images.create);
        app.post('/following/add', auth, Subscriptions.addFollower);
        app.post('/following/remove', auth, Subscriptions.removeFollower);
        app.post('/image/like', auth, Images.like);
        app.post('/image/unlike', auth, Images.unlike);
        app.post('/:account_id/settings/address', auth, LocationController.update);
        app.post('/upload/profilepicture/:user_id', auth, ImageHelper.setProfilePicture);
        app.post('/comment/post', auth, CommentController.addComment);
        app.post('/comment/reply', auth, CommentReplyController.addReply);
        app.post('/comment/like', auth, CommentController.like);
        app.post('/comment/dislike', auth, CommentController.dislike);
        app.post('/post/text', auth, TextPostsController.addTextPost);
        app.post('/textPost/like', auth, TextPostsController.like);
        app.post('/textPost/unlike',auth, TextPostsController.unlike);
        app.post('/privatemessages/add', auth, ChatController.addMessage);
        app.delete('/deregister/:_id', auth, Credentials.remove);
        app.put('/credentials/changepassword/:_id', auth, Credentials.update);
        app.put('/profile/update/:_id/:oldUsername', auth, CredentialsHelpers.changeProfile);
    }
};