const url = require('url');
const querystring = require('querystring');
const Account = require('../models/account.model');

module.exports = {
    searchUsers(req, res){
        const parsedRequest = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedRequest.query);
        const searchterm = parsedQuery.name;

        Account.find({owner: {$regex: searchterm, $options: 'i'}}, {owner: 1, profilePic: 1, owner_id: 1}, (err, users) => {
            if (err) {
                console.error(err);
            }else {
                res.send(users);
            }
        });
    },
};