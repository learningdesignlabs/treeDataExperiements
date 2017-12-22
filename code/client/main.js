import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

// Refactor - render routes instead. app layout to move to a container component
// Also changed name of App component to Tree for experiment only
import AppContainer from '../imports/ui/containers/AppContainer.jsx';

Meteor.startup(() => {
  render(<AppContainer />, document.getElementById('render-target'));
});
