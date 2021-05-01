import React, { Component } from "react";
import { browserHistory } from "react-router";
import FlatList from "flatlist-react";

import "../CSS/Home.css";

const people = [
  { firstName: "Elson", lastName: "Correia", info: { age: 24 } },
  { firstName: "John", lastName: "Doe", info: { age: 18 } },
  { firstName: "Elson", lastName: "Correia", info: { age: 24 } },
  { firstName: "John", lastName: "Doe", info: { age: 18 } },
  { firstName: "Elson", lastName: "Correia", info: { age: 24 } },
  { firstName: "John", lastName: "Doe", info: { age: 18 } },
  { firstName: "Elson", lastName: "Correia", info: { age: 24 } },
  { firstName: "John", lastName: "Doe", info: { age: 18 } },
 
];

export default class App extends Component {
  state = {
    newSelected: true,
  };
  disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x-10, y-10);
    };
  }

  async componentDidMount() {
    this.disableScrolling();
  }

  renderPerson = (person, idx) => {
    return (
      <li>
        <div class="List-box ">
          <text style={{ color: "black" }}>
            {person.firstName} {person.lastName}
          </text>
        </div>
      </li>
    );
  };

  render() {
    return (
      <div class='Main-div'>
        <header class="Home-header">
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
          <div class="List-outer-div" style={{ overflowY: "scroll" }}>
            <FlatList
              list={people}
              renderItem={this.renderPerson}
              renderWhenEmpty={() => <div>List is empty!</div>}
            />

            <br></br>
            <br></br>
            <button
              class="Load-box"
              onClick={() => this.setState({ newSelected: !this.state.newSelected })}
            >
              <text class="Load-text">Load More</text>
            </button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
          <div class="Bottom-title"></div>
          <text class="Bottom-title-text">HACKERNEWS.</text>
        </header>
      </div>
    );
  }
}

