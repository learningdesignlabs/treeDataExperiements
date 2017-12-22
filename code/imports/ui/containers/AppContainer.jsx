import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { getTreeFromFlatData } from 'react-sortable-tree';

import { Features, FeaturesUserPreferences } from '/imports/api/Features/features.js';

import App from '/imports/ui/layouts/App.jsx';

export default withTracker(() => {
  const featuresHandle = Meteor.subscribe('featuresPub');
  const featuresUserPreferencesHandle = Meteor.subscribe('featuresUserPreferencesPub');
  const loading = !featuresHandle.ready() && !featuresUserPreferencesHandle.ready();
  const featuresExists = !loading;

  const flatTreeData = Features.find({}, {
    transform: (treeNode) => {
      console.log('Looking at node: ', treeNode);
      let expandedNode = FeaturesUserPreferences.findOne({ userId: 'currentUserId', featureId: treeNode._id, expanded: true });

      if (expandedNode) {
        console.log('found expanded node');
        treeNode.expanded = true;
      } else {
        console.log('did not find any expanded node');
      }
      return treeNode;
    },
  }).fetch();
  return {
    loading,
    featuresExists,
    features: featuresExists ? (getTreeFromFlatData(
      {

        flatData: flatTreeData,
        getKey: node => node._id, // resolve a node's key
        getParentKey: node => node.parent, // resolve a node's parent's key

        rootKey: null, // The value of the parent key when there is no parent (i.e., at root level)
      },
    )) : [],
  };
})(App);
