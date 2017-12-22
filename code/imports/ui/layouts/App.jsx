import React, { Component } from 'react';
import Tree from '../components/Tree.jsx';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { features } = this.props;
    return (
      <div>
        <Tree features={features} />
      </div>
    )
  }
}
