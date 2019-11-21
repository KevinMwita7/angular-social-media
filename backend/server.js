const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const process = require('process');
const serveStatic = require('serve-static');
const MongoClient = require('mongodb').MongoClient;
const Server = require('mongodb').Server;
const routes = require('./server-helpers/routes');
const Middlewares = require('./server-helpers/register-middlewares');
const ImageComment = require('./socket-helpers/comment.helpers');
const CommentReply = require('./socket-helpers/comment-reply.helpers');

//app.use(express.static(path.join(__dirname, "public")));
app.use(serveStatic(path.join(__dirname, "public")));
app.get('/public/uploads/:userId/:filename', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'uploads', req.params.userId, req.params.filename), {
    //root: __dirname + '/public/',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
  }
  });
});
app.disable('x-powered-by');
// mongoose.set('debug', true);

// register port and middlewares
app.set('port', process.env.PORT || 4000);
app.set('io', io);
// error handlers
Middlewares.register(app);

// connect to database
mongoose.connect('mongodb://localhost:27017/ChatUp', {useNewUrlParser: true});
// set up connection to local db
let mongoClient = new MongoClient( new Server ('localhost', 27017, {native_parser: true}));
// open up a connection to the server
mongoClient.connect((err, mongoClient) => {
  if (err) console.log(err);
  let db = mongoClient.db('ChatUp');
  // db.collection('messages').drop();
  app.set('db', db);
});

// add event listener to the one-time event of database being opened
const connection = mongoose.connection;
connection.once('open', () => console.log('Connected to mongodb database'));

// routes
routes.defineRoutes(app);
// socket represents one connected client(in one namespace, but in possibly multiple rooms)
io.on('connection', (socket) => {
  socket.on('search query', query => {
    BrowsePageSearch.onQuery(socket, query);
  });
  socket.on('private message', msg => {
    socket.broadcast.to(msg.conversation_id).emit('incoming private message', msg);
  });
  // join a private chat
  socket.on('initiate chat conversation socket', conversation_id => {
      if (conversation_id) {
        console.log(`Joining room ${conversation_id}`);
        socket.join(conversation_id);
      }
  });
});
// socket-io namespaces
const CommentsIO = io.of('/comments'), 
CommentRepliesIO = io.of('/comment-replies'),
CommentActionsIO = io.of('/comment-actions'),
RealTimePostStatsIO = io.of('/real-time-post-stats'),
SearchIO = io.of('/search');

app.set('CommentsIO', CommentsIO);
app.set('CommentActionsIO', CommentActionsIO);
app.set('RealTimePostStatsIO', RealTimePostStatsIO);
app.set('SearchIO', SearchIO);
CommentsIO.on('connection', (socket) => {
  socket.on('image comment', comment => {
    ImageComment.onImageComment(CommentsIO, comment);
  });
});
CommentRepliesIO.on('connection', socket => {
  socket.on('comment reply', reply => {
    CommentReply.onCommentReply(CommentRepliesIO, reply);
  });
});
http.listen(app.get('port'), () => console.log(`Server running on http://localhost:${app.get('port')}`));
