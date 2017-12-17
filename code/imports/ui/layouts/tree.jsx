import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SortableTree from 'react-sortable-tree';

import { Features } from '/imports/api/Features/features.js';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Dog',children: [{title: 'puppy'}]},
      ],
    };

  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.props.features}
          onChange={(treeData) => {
            this.setState({treeData});
            console.log("treeData is", treeData);
          }}
        />
      </div>
    );
  }
}

// Export default is how we set the props of the
// Tree component
//
export default withTracker(() => {
  Meteor.subscribe('features');

  return {
    features: Features.find({}).fetch(),
  };
})(Tree);
