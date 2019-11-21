const Account = require('../models/account.model');

module.exports = {
    fetchAccount: function(req, res){
        Account.findOne({owner_id: req.params.owner_id}, {__v: 0}, (err, account) => {
            if(err) console.error(err);
            res.send(account);
        });
    }
};