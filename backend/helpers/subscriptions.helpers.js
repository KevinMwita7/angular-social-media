const Following = require('../models/following.model');

//make it a promise to enbale us to subscribe to it and send back response once done
module.exports = {
     addToFollowingList : function(details){
        return new Promise(() => {
            Following.findOne({user_id: details.follower}, (error, _following) => {
                if(error) console.log(error);
                if(_following){                
                        if(!_following.following.includes(details.user_id)) _following.following.push(details.user_id);
                    _following.save(_error => {
                        if(_error){
                            console.log(_error);
                            return _error;
                        }
                        return 'Successfully saved follower';
                    });
                }else{
                    let following = new Following();
                    following.user_id = details.follower;
                    following.following.push(details.user_id);
                    following.save(_err => {
                        if(_err){
                            console.log(_err);
                            return _err;
                        }
                        return 'Successfully saved follower';
                    });
                }
            });
        },()=>{
            throw new Error('Error while updating the followings list');
        });
    },
    removeFromFollowingList: function (details) {
        return new Promise(() => {
            Following.findOne({user_id: details.follower}, (err, _following) => {
                if(err) console.log(err);
                if(_following.following.includes(details.user_id)) _following.following.splice(_following.following.indexOf(details.user_id), 1);
                else return 'User not in the followings list.';
                _following.save(err => {
                    if(err) throw new Error('Error while saving the followings list');
                });
            });
        }, () => {
            throw new Error('Error while removing from the followings list');
        }); 
    }
};