import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import SortableTree, { getFlatDataFromTree, getTreeFromFlatData } from 'react-sortable-tree';

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
      features: nextProps.features,
    });
  }

  render() {
    // function to build alert node data and pass to global alert method
    const alertNodeInfo = ({ node, path, treeIndex }) => {
      const objectString = Object.keys(node)
        .map(k => (k === 'children' ? 'children: Array' : `${k}: '${node[k]}'`))
        .join(',\n   ');

      global.alert('Info passed to the button generator:\n\n' +
          `node: {\n   ${objectString}\n},\n` +
          `path: [${path.join(', ')}],\n` +
          `treeIndex: ${treeIndex}`);
    };
    // flat data variable using the getFlatDataFromTree function passed to input value on line 55.
    const flatData = getFlatDataFromTree({
      treeData: this.state.features,
      getNodeKey: ({ node }) => node._id,
      ignoreCollapsed: false,
    }).map(({ node, path }, index) => ({
      id: node._id,
      title: node.title,
      order: index,
      subtitle: node.subtitle,
      details: node.details,
      parent: path.length > 1 ? path[path.length - 2] : null,
    }));

    return (
      <div style={{ height: 800 }}>
        <div>
          <input
            style={{ width: '100%' }}
            type="text"
            value={JSON.stringify(flatData)}
            readOnly
          />
        </div>
        <SortableTree
          treeData={this.state.features}
          onChange={(features) => {
            this.setState({features});
            console.log("treeData is", features);
          }}
          generateNodeProps={rowInfo => ({
            buttons: [
              <button
                style={{ verticalAlign: 'middle' }}
                onClick={() => alertNodeInfo(rowInfo)}
              > i
              </button>,
            ],
          })}
        />
      </div>
    );
  }
}

// create a container using withTracker to pass the features Collection
// as a props to the Tree component
/*
export default withTracker(() => {
  const featuresHandle = Meteor.subscribe('features');
  const loading = !featuresHandle.ready();
  const featuresExists = !loading;
  return {
    loading,
    featuresExists,
    features: featuresExists ? Features.find().fetch() : [],
  };
})(Tree);
*/


export default withTracker(() => {
  const featuresHandle = Meteor.subscribe('features');
  const loading = !featuresHandle.ready();
  const featuresExists = !loading;
  return {
    loading,
    featuresExists,
    features: featuresExists ? (getTreeFromFlatData(
      {

        flatData: Features.find().fetch(),
        getKey: node => node._id, // resolve a node's key
        getParentKey: node => node.parent, // resolve a node's parent's key

        rootKey: null // The value of the parent key when there is no parent (i.e., at root level)
      }
    )) : [],
  };



})(Tree);
