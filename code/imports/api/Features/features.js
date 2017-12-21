import { Mongo } from 'meteor/mongo';

export const Features = new Mongo.Collection('features');

// Keeps tracks of user specific options on each feature node.
// example: {_id: 'somerandomid', 'userId': 'someUserId', featureId: 'idfromdocinfeaturescollection', 'expanded: true'}
export const FeaturesUserPreferences = new Mongo.Collection('featuresUserPreferences');
