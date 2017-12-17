import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

// Refactor - render routes instead. app layout to move to a container component
// Also changed name of App component to Tree for experiment only
import Tree from '../imports/ui/layouts/tree.jsx';

Meteor.startup(() => {
  render(<Tree />, document.getElementById('render-target'));
});
