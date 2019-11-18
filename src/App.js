import React, { Component } from "react";
import ListView from "./components/ListView";
import MapViewR from "./components/MapViewR";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: []
    };
    this.getData = this.getData.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.page);
  }

  next() {
    const nextPage = this.state.page + 1;

    this.setState({ page: nextPage });
    this.getData(nextPage);
  }

  previous() {
    const previousPage = this.state.page - 1;

    if (previousPage >= 1) {
      this.setState({ page: previousPage });
    }
    this.getData(previousPage);
  }

  async getData(page) {
    let response;

    try {
      if (page > 1) {
        response = await fetch(
          `https://api.mobilize.us/v1/events?page=${page}`
        );
      } else {
        response = await fetch("https://api.mobilize.us/v1/events");
      }
      const data = await response.json();

      this.setState({ data: data.data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Event List View</h1>
        </div>

        <div className="listMapContainer">
          <div className="list-section">
            <ListView eventList={this.state} />

            <div>
              <button type="button" onClick={this.previous}>
                Previous
              </button>

              <button type="button" onClick={this.next}>
                Next
              </button>
            </div>
          </div>

          <MapViewR state={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
