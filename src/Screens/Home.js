import React, { Component } from "react";
import { browserHistory } from 'react-router';


export default class App extends Component {
  onClick() {
    browserHistory.push("/Test");
  }
  render() {
    return <button onClick={this.onClick.bind(this)}>Add New user</button>;
  }
}
