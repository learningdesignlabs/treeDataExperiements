import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import SortableTree, { getFlatDataFromTree } from 'react-sortable-tree';


export default class Tree extends Component {
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
            this.setState({ features });
            // console.log('treeData is', features);
          }}
          generateNodeProps={rowInfo => ({
            onClick: (event) => {
              const collapseClicked = event.target.className === 'rst__collapseButton';
              const expandClicked = event.target.className === 'rst__expandButton';

              if (collapseClicked) {
// console.log('You just collapsed the ', rowInfo.node.title, ' node with the id of ', rowInfo.node_id);
                Meteor.call('updateFeaturesUsersPreferences', 'currentId', { featureId: rowInfo.node._id, expanded: false });
              }

              if (expandClicked) {
// console.log('You just expanded the ', rowInfo.node.title, ' node with the id of ', rowInfo.node._id);
                Meteor.call('updateFeaturesUsersPreferences', 'currentId', { featureId: rowInfo.node._id, expanded: true });
              }
            },
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
