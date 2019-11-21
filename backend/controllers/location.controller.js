const LocationModel = require('../models/location.model');
const LocationModelHelpers = require('../helpers/location.helpers');

module.exports = {
    update: function(req, res){
        LocationModelHelpers.updateLocation(req.body, req.params.account_id).then(resolve => res.send(resolve)).catch(err => console.error(err));
    },

    remove: function(req, res){
        LocationModel.findOneAndDelete({user_id: req.body._id}, (err, result) => {
            if(err) console.error(err);
            if(result) res.send('Successfully removed address');
        });
    },
    fetchCity: function(req, res){
        LocationModel.findOne({owner_id: req.params.owner_id}, {city: 1, country:1}, (err, city) => {
            if(err) console.error(err);
            res.send(city);
        });
    }
};