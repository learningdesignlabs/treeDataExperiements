import { Meteor } from 'meteor/meteor';
import { Features, FeaturesUserPreferences } from '/imports/api/Features/features.js';

Meteor.methods({

  updateFeaturesUserPreferences(usrId, prefs) {
    //if (! this.userId) {
    if (!usrId) {
      throw new Meteor.Error('unauthorized');
    }

//    console.log("Trying insert..");
    FeaturesUserPreferences.upsert({userId:usrId}, { $set:prefs });
//    console.log("Finished insert...");
    return true;
  }
});
