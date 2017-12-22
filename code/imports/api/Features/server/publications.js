import { Meteor } from 'meteor/meteor';
import { Features, FeaturesUserPreferences } from '/imports/api/Features/features.js';

Meteor.publish('featuresPub', function() {
  return Features.find({});
});

<<<<<<< HEAD
Meteor.publish('featuresUserPreferencesPub', function() {
=======
Meteor.publish('featuresUserPreferences', function() {
>>>>>>> 13268d817bf211a1766997cf46621d9d1d25d562
  return FeaturesUserPreferences.find({});
});
