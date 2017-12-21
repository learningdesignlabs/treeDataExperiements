import { Meteor } from 'meteor/meteor';
import { Features, FeaturesUserPreferences } from '/imports/api/Features/features.js';

Meteor.publish('features', function() {
  return Features.find({});
});

Meteor.publish('featuresUserPreferences', function() {
  return FeaturesUserPreferences.find({});
});
