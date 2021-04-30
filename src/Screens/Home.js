import React, { Component } from "react";
import { browserHistory } from "react-router";
import "../CSS/Home.css";

export default class App extends Component {
  state = {
    newSelected: true,
  };

  async componentDidMount() {}

  render() {
    return (
      <div>
        <header className="Home-header">
          <div class="Title-header">
            <div class="Title-style">
              <text class="Title-text1">HACKER</text>
              <text class="Title-text2">NEWS</text>
              <text class="Title-text1">.</text>
            </div>
          </div>
          <div
            class="Top-buttons"
            style={{
              backgroundColor: this.state.newSelected ? "#FBC91B" : "#F2F2F2",
              left: 16,
            }}
            onClick={() => this.setState({ newSelected: true })}
          >
            <text class="Top-buttons-text">New</text>
          </div>
          <div
            class="Top-buttons"
            style={{
              backgroundColor: !this.state.newSelected ? "#FBC91B" : "#F2F2F2",
              left: 110,
            }}
            onClick={() => this.setState({ newSelected: false })}
          >
            <text class="Top-buttons-text">Past</text>
          </div>
          <div class="Load-box"><text  class="Load-text">Load More</text></div>
        </header>
      </div>
    );
  }
}
