import React, { Component } from "react";
import { browserHistory } from "react-router";
import FlatList from "flatlist-react";
import moment from "moment";
import ReactLoading from "react-loading";

import "../CSS/Home.css";
import clock from "../assets/clock.svg";

const api = require("../Configurations/api");

export default class App extends Component {
  state = {
    isLoading: false,
    isNextLoading: false,
    newSelected: true,
    pastSelected: false,
    topSelected: false,
    nextIndex: 0,
    noData: false,
    newStoriesIdList: [],
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
    this.setState({ isLoading: true });
    this.disableScrolling();
    this.getNewStoriesIdList();
  }

  whichList(listType) {
    if (listType == "new" && !this.state.newSelected) {
      this.setState(
        {
          newSelected: true,
          pastSelected: false,
          topSelected: false,
          isLoading: true,
          stories: [],
        },
        () => this.getNewStoriesIdList()
      );
    } else if (listType == "past" && !this.state.pastSelected) {
      this.setState(
        {
          newSelected: false,
          pastSelected: true,
          topSelected: false,
          isLoading: true,
          stories: [],
        },
        () => this.getNewStoriesIdList()
      );
    } else if (listType == "top" && !this.state.topSelected) {
      this.setState(
        {
          newSelected: false,
          pastSelected: false,
          topSelected: true,
          isLoading: true,
          stories: [],
        },
        () => this.getNewStoriesIdList()
      );
    }
  }

  async getNewStoriesIdList() {
    fetch(
      api.baseUrl +
        (this.state.topSelected ? "topstories.json" : "newstories.json")
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ newStoriesIdList: data }, () =>
          this.setState(
            {
              newStoriesIdList: this.state.pastSelected
                ? this.state.newStoriesIdList.reverse()
                : this.state.newStoriesIdList,
            },
            () => this.getTopThreeStories()
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getTopThreeStories() {
    this.setState({ isNextLoading: true });
    for (var i = this.state.nextIndex; i < this.state.nextIndex + 3; i++) {
      await fetch(
        api.baseUrl + "item/" + this.state.newStoriesIdList[i] + ".json"
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ stories: this.state.stories.concat(data) });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    this.setState({
      noData: false,
      isLoading: false,
      nextIndex: i,
      isNextLoading: false,
    });
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
        <div
          class="List-box"
          onClick={() =>
            item.url == ""
              ? alert("No URL available.")
              : window.open(item.url, "_blank")
          }
        >
          <text class="List-title">
            {item.title == "" || item.title == null
              ? "No title available"
              : item.title}
          </text>
          <text class="List-description">
            {item.text == "" || item.text == null
              ? "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, …when an unknown printer took a galley of type and scrambled"
              : this.getDescription(item.text)}
          </text>
          <img src={clock} className="List-clock" alt="clock" />
          <text className="List-time">
            {item.time == "" || item.time == null
              ? "No time available"
              : this.getTime(item.time)}{" "}
            |{" "}
            {item.descendants == "" || item.descendants == null
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
            onClick={() => this.whichList("new")}
          >
            <text class="Top-buttons-text">New</text>
          </div>
          <div
            class="Top-buttons"
            style={{
              backgroundColor: this.state.pastSelected ? "#FBC91B" : "#F2F2F2",
              left: 110,
            }}
            onClick={() => this.whichList("past")}
          >
            <text class="Top-buttons-text">Past</text>
          </div>
          <div
            class="Top-buttons"
            style={{
              backgroundColor: this.state.topSelected ? "#FBC91B" : "#F2F2F2",
              left: 200,
            }}
            onClick={() => this.whichList("top")}
          >
            <text class="Top-buttons-text">Top</text>
          </div>
          {!this.state.isLoading ? (
            <div class="List-outer-div" style={{ overflowY: "scroll" }}>
              <FlatList
                list={this.state.stories}
                renderItem={this.renderList}
                renderWhenEmpty={this.renderEmptyList}
              />

              <br></br>
              <br></br>
              {!this.state.noData ? (
                !this.state.isNextLoading ? (
                  <button
                    class="Load-box"
                    onClick={() => this.getTopThreeStories()}
                  >
                    <text class="Load-text">Load More</text>
                  </button>
                ) : (
                  <ReactLoading
                    type={"spin"}
                    color={"black"}
                    height={50}
                    width={25}
                    class="NextLoading-spin"
                  />
                )
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
            </div>
          ) : (
            <ReactLoading
              type={"spin"}
              color={"black"}
              height={50}
              width={25}
              class="Loading-spin"
            />
          )}
          <div class="Bottom-title"></div>
          <text class="Bottom-title-text">HACKERNEWS.</text>
        </header>
      </div>
    );
  }
}
