const Followers = require('../models/followers.model');
const Following = require('../models/following.model');
const SubscriptionHandler = require('../helpers/subscriptions.helpers');
/**
 * Handle the situation whereby the user may be mashing the follow/unfollow button
 * Import the notification module and use one of its functions to send notification
 */
module.exports = {
    addFollower(req, res){
    Followers.findOne({user_id: req.body.user_id}, (err, _followers) => {
        if(err) console.log(err);
        if(_followers){
            if(!_followers.followers.includes(req.body.follower)){
                _followers.followers.push(req.body.follower);
                _followers.save(error => {
                    if(error) console.log(error);
                    SubscriptionHandler.addToFollowingList(req.body).then(resolve => {
                        res.setHeader('Content-Type', 'text/plain');
                        res.send(resolve);
                    }).catch(_err => {if(_err) console.log(_err);});
                });
            }
        }else{
            let Follower = new Followers();
            Follower.user_id = req.body.user_id;
            Follower.followers.push(req.body.follower);
            Follower.save(error => {
                if(err) console.log(error);
                SubscriptionHandler.addToFollowingList(req.body).then(resolve => {
                    res.setHeader('Content-Type', 'text/plain');
                    res.send(resolve);
                }).catch(_err => {if(_err) console.log(_err);});
            });
        }
    });
    },
    removeFollower(req, res){
        Followers.findOne({user_id: req.body.user_id}, (err, _followers) => {
            if(err) console.log(err);
            if(_followers){
                if(_followers.followers.includes(req.body.follower)){
                    _followers.followers.splice(_followers.followers.indexOf(req.body.follower), 1);
                    _followers.save(error => {
                       if(error) console.log(error);
                       SubscriptionHandler.removeFromFollowingList(req.body).then(resolve => {
                        res.setHeader('Content-Type', 'text/plain');
                        res.send(resolve);
                       }).catch(_err => {if(_err) console.log(_err);}); 
                    });
                }else {
                    res.setHeader('Content-Type', 'text/plain');
                    res.send('Successfully removedFollower');
                }
            }
        });
    },
    getPeopleFollowed(req, res){
        Following.findOne({user_id: req.params.username}, {user_id:0, __v:0, _id:0}, (err, peopleFollowed) => {
            if(err) console.log(err);
            if(peopleFollowed) res.send(peopleFollowed);
        });
    },
    getFollowers(req, res){
        Followers.findOne({leader: req.params.leader}, {followers: 1}, (err, followers) => {
            if(err) console.error(err);
            if(followers) res.send(followers);
        });
    }
};