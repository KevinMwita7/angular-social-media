const LocationModel = require('../models/location.model');

module.exports = {
    updateLocation(newLocation, owner){
        return new Promise(()=>{
          LocationModel.findOne({owner_id: owner}, (err, oldLocation) => {
              if(err) console.error(err);
              if(oldLocation){
                oldLocation.city = newLocation.city;
                oldLocation.country = newLocation.country;
                oldLocation.save(err => {
                    if(err) console.error(err);
                    return 'Successfully updated location.';
                  });
              }else{
                  this.createLocation(newLocation, owner).then(resolve => {return resolve}).catch(err => console.error(err));
              }
          });   
        }, () => {
            throw new Error('Error while updating old location.');
        });
    },
    createLocation(newLocation, owner){
        return new Promise(()=>{
            let location = new LocationModel({});
            location.owner_id = owner;
            location.city = newLocation.city;
            location.country = newLocation.country;
            location.save(err => {
                if(err) console.error(err);
                return 'Successfully created new location.';
              });
        }, () => {
            throw new Error('Error while creating location.');
        });
    },
};