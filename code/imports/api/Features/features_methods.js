import { Meteor } from 'meteor/meteor';
import { FeaturesUserPreferences } from '/imports/api/Features/features.js';

Meteor.methods({
  updateFeaturesUserPreferences(usrId, prefs) {
    if (!usrId) {
      throw new Meteor.Error('unauthorized');
    }
    // console.log('Trying to insert...');
    FeaturesUserPreferences.upsert({ userId: usrId }, { $set: prefs });
    // console.log('Finished insert...');
    return true;
  },
});
