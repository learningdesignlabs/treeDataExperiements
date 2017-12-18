import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SortableTree from 'react-sortable-tree';

import { Features } from '/imports/api/Features/features.js';

class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      features: props.features,
    };
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      features: nextProps.features
    });
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.features}
          onChange={(features) => {
            this.setState({features});
            console.log("treeData is", features);
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
  const features = Features.find({}).fetch();
  return { features };
})(Tree);
