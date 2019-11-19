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
    // this.filterData = this.filterData.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.page);
  }

  next() {
    const nextPage = this.state.page + 1;

    this.setState({ page: nextPage });
    this.getData(nextPage);
    window.scrollTo(0, 0);
  }

  previous() {
    const previousPage = this.state.page - 1;

    if (previousPage >= 1) {
      this.setState({ page: previousPage });
    }
    this.getData(previousPage);

    window.scrollTo(0, 0);
  }

  async getData(page) {
    let response;
    // const date = new Date();

    try {
      if (page > 1) {
        response = await fetch(
          `https://api.mobilize.us/v1/events?page=${page}`
        );
      } else {
        response = await fetch("https://api.mobilize.us/v1/events");
      }
      const data = await response.json();
      // this.filterData(data.data, date);

      this.setState({ data: data.data });
    } catch (error) {
      console.error(error);
    }
  }

  // filterData(data, date) {
  //   const newData = data.map(event =>
  //     event.timeslots.filter(timeSlots => timeSlots.start_date * 1000 > date)
  //   );

  //   console.log("newData, ", newData);
  // }

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
              <button
                className="previousButton"
                type="button"
                onClick={this.previous}
                disabled={this.state.page === 1 ? true : false}
                style={
                  this.state.page === 1
                    ? { color: "grey", borderBottom: 0, cursor: "auto" }
                    : null
                }
              >
                Previous
              </button>

              <button className="nextButton" type="button" onClick={this.next}>
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
