import { Meteor } from 'meteor/meteor';
import { Features, FeaturesUserPreferences } from '/imports/api/Features/features.js';

Meteor.publish('featuresPub', function() {
  return Features.find({});
});

Meteor.publish('featuresUserPreferencesPub', function() {
  return FeaturesUserPreferences.find({});
});
