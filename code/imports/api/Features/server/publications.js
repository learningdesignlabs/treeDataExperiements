import { Meteor } from 'meteor/meteor';
import { Features } from '/imports/api/Features/features.js';

Meteor.publish('features', function() {
  return Features.find({});
});
