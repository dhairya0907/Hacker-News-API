import React, { Component } from "react";
import { browserHistory } from "react-router";
import FlatList from "flatlist-react";
import moment from "moment";
import ReactLoading from 'react-loading';

import "../CSS/Home.css";
import clock from "../assets/clock.svg";

const api = require("../Configurations/api");

export default class App extends Component {
  state = {
    isLoading : false,
    newSelected: true,
    nextIndex : 0,
    noData: false,
    topStoriesIdList: [],
    stories: [],
    people: [
      { title: "Elson", description: "Correia", time: "", comments: 50 },
      { title: "Elson", description: "Correia", time: 2, comments: "" },
      { title: "Elson", description: "", time: 2, comments: 50 },
    ],
  };
  disableScrolling() {
    var x = window.scrollX;
    var y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x - 10, y - 10);
    };
  }

  async componentDidMount() {
    this.setState({isLoading : true})
    this.disableScrolling();
    this.getTopStoriesIdList();
  }

  async getTopStoriesIdList() {
    fetch(api.baseUrl + "topstories.json")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ topStoriesIdList: data }, () =>
          this.getTopThreeStories()
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getTopThreeStories() {
    for (var i = this.state.nextIndex; i < this.state.nextIndex + 3; i++) {
      await fetch(
        api.baseUrl + "item/" + this.state.topStoriesIdList[i] + ".json"
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ stories: this.state.stories.concat(data) });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.setState({ noData: false, isLoading : false, nextIndex : i });
  }

  getTime(time) {
    var date = new Date(time * 1000);

    return moment(date).fromNow();
  }

  getDescription(description) {
    return description.replace(/(<([^>]+)>)/gi, "");
  }

  renderList = (item, idx) => {
    return (
      <li>
        <div class="List-box">
          <text class="List-title">
            {item.title == "" ? "No title available" : item.title}
          </text>
          <text class="List-description">
            {item.text == "" || item.text == null
              ? "No description available"
              : this.getDescription(item.text)}
          </text>
          <img src={clock} className="List-clock" alt="clock" />
          <text className="List-time">
            {item.time == "" ? "No time available" : this.getTime(item.time)} |{" "}
            {item.descendants == ""
              ? "No comments available"
              : item.descendants + " comments"}
          </text>
        </div>
      </li>
    );
  };

  renderEmptyList = () => {
    this.setState({ noData: true });
    return (
      <div class="noList-box">
        <text class="noList-text">No Data Available!</text>
      </div>
    );
  };

  render() {
    return (
      <div class="Main-div">
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
          {!this.state.isLoading ?
          <div class="List-outer-div" style={{ overflowY: "scroll" }}>
            <FlatList
              list={this.state.stories}
              renderItem={this.renderList}
              renderWhenEmpty={this.renderEmptyList}
            />

            <br></br>
            <br></br>
            {!this.state.noData ? (
              <button class="Load-box" onClick={() => this.getTopThreeStories()}>
                <text class="Load-text">Load More</text>
              </button>
            ) : null}
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
          </div> :
          <ReactLoading type={"spin"} color={"black"} height={100} width={50} class="Loading-spin"/>}
          <div class="Bottom-title"></div>
          <text class="Bottom-title-text">HACKERNEWS.</text>
        </header>
      </div>
    );
  }
}
