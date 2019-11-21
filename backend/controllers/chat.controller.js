const ObjectId = require('mongodb').ObjectID;
const url = require('url');
const querystring = require('querystring');

module.exports = {
    // add a new message to the database
    addMessage(req, res) {
        const db = req.app.get('db');
        const message = req.body;
        db.collection('privateMessages').insertOne({
            conversation_id: new ObjectId(message.thread._id),
            sender_id: new ObjectId(message.sender_id),
            body: message.body,
            createdAt: new Date(message.createdAt),
            updatedAt: new Date()
        }, (err, result) => {
            if (err) console.log(err);
            res.json({'Success': 'Message successfully sent'});
        });
     },
    // get the conversations a user has had before
    getConversations(req, res) {
        const db = req.app.get('db');
        const parsedRequest = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedRequest.query);
        const user_id = parsedQuery.participant_id;
        // find all conversations in which the user was involved in. Done to initialize the threads on the front-end
        db.collection('privateConversations')
        .find({'participants': user_id})
        .toArray((err, conversations) => {
            if(err) console.error(err);
            // get last message of each conversation
            else {
                for (let i = 0, size = conversations.length; i < size; ++i) {
                db.collection('privateMessages')
                .find({conversation_id: new ObjectId(conversations[i]._id)})
                .sort({createdAt: -1}).toArray((error, messages) => {
                    if (error) console.log(error);
                    // attach the last message to each conversation
                    conversations[i].lastMessage = messages[0];
                    // if that was the last conversation, then send the messages
                    // TODO: send the conversations using sockets 
                    if (i === size - 1){
                        res.send(conversations);
                    }
                });
            }}
            // else res.send(conversations);
        });
    },
    // get the messages that are in a conversation. Done when a user selects a thread
    getMessages(req, res) {
        const db = req.app.get('db');
        const parsedRequest = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedRequest.query);

        // find the conversation. Only one conversation can exist for two people
        db.collection('privateConversations')
        .findOne({'participants': {$all: [parsedQuery.participant_a, parsedQuery.participant_b]}}, (err, conversation) => {
            if (err) console.log(err);
            // the users had chatted before
            if (conversation) {
                db.collection('privateMessages')
                .find({'conversation_id': new ObjectId(conversation._id)})
                .toArray((err, messages) => {
                    if (err) console.log(err);
                    res.send({conversation_id: conversation._id, messages: messages});
                });
            }
            else {
                // create a conversation as it does not exist
                db.collection('privateConversations')
                .insertOne({'participants': [parsedQuery.participant_a, parsedQuery.participant_b],
                createdAt: new Date(),
                updatedAt: new Date()}, (err, result) => {
                    if (err) console.log(err);
                    // send the conversation's _id to the client
                    // res.write(result.ops[0]._id);
                    // send an empty array as the messages do no exists
                    res.send({conversation_id: result.ops[0].id, messages: []});
                });
            }
        });
    },
    getAllMessages (req, res) {
        const db = req.app.get('db');
        const parsedRequest = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedRequest.query);
        const user_id = parsedQuery.participant_id;

        // get all conversations a user partcipated in
        db.collection('privateConversations').
        find({'participants': user_id}).
        toArray((err, conversations) => {
        // get all messages in each conversation
        if (err) console.log(err);
        for (let i = 0, size = conversations.length; i < size; ++i) {
            // get the account of the other participant in the conversation i.e. not the currently
            // logged in user and attach their name and profile picture to the conversation
            for (let j = 0, len = conversations[i].participants.length; j < len ; ++ j){
                if (conversations[i].participants[j] && conversations[i].participants[j] !== user_id) {
                    db.collection('accounts').
                    find({'_id': new ObjectId(conversations[i].participants[j])}).
                    toArray((err, account) => {
                        if (err) console.log(err);
                    // get all messages in a conversation and attach the messsages with info
                    // about the conversation they belong to
                    db.collection('privateMessages').
                    find({'conversation_id': new ObjectId(conversations[i]._id)}).
                    toArray((error, messages) => {
                        if (error) console.log(error);
                        for (let k = 0, sz = messages.length; k < sz; ++k) {
                            messages[k].thread = conversations[i];
                            messages[k].thread.name = account[0].owner;
                            messages[k].thread.avatarSrc = account[0].profilePic;
                            // return the messages if we are in the last conversation at the 
                            // the last message
                            if (i === size - 1 && k === sz - 1) {
                                res.send(messages);
                            }
                        }            
                    });
                });
                }
            }
        }
        });
    },
     getFriendsList(req, res) {
         const db = req.app.get('db');
         const parsedRequest = url.parse(req.url);
         const parsedQuery = querystring.parse(parsedRequest.query);
         const user_id = parsedQuery.user_id;
         // only people that the user follows back appear in the chat side bar
         db.collection('followings').
         find({user_id: new ObjectId(user_id)}).
         toArray((err, _result) => {
            // TODO: considering one might have a lot of followers, it will be highly inefficient to traverse
            //  one's followers array to know if they followed back. Improve on this to know if someone 
            // followed back in a much faster way
            if (_result.length) {
            const peopleFollowed = _result[0].following;
            if (err) console.log(err);
            // retrieve the followers list
            db.collection('followers').
            find({user_id: new ObjectId(user_id)}).
            toArray((error, result) => {
                if(error) console.log(error);
               if (result.length) {
                const _followers = result[0].followers;
                const friends = [];
                for (let i = 0, size = peopleFollowed.length; i < size; ++i ) {
                    if (_followers.includes(peopleFollowed[i])) {
                        db.collection('accounts').
                        find({owner_id: new ObjectId(peopleFollowed[i])})
                        .toArray((_err, account) => {
                            if (_err) console.log(_err);
                            else {
                                // since the account was converted into an array before being pushed into the friends array,
                                // only the first and only element is being sent back to the client
                                friends.push(account[0]);
                                if (i === size - 1){
                                    res.send(friends);
                                }
                            }
                        });
                    }
                }
               }
            });
            }
         });
     }
};
 