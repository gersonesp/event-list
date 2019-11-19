import React, { Component } from "react";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import markerImage from "../mapbox-icon.png";
import locatorImage from "../locator.png";
import findLocation from "../findLocation.png";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoianNvbi0iLCJhIjoiY2szMXR0c3RuMGN5eDNjcHBrYzlhOXZhMiJ9.r4anECwkWAynyfKyQx4xHg"
});

class MapViewR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {}
    };
    this.setUserLocation = this.setUserLocation.bind(this);
    this.showPopup = this.showPopup.bind(this);
  }

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let userLocation = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        zoom: 13
      };
      this.setState({
        userLocation
      });
    });
  };

  showPopup(eventId) {
    let id = `popup-${eventId}`;
    let element = document.getElementsByClassName(id)[0];

    if (element) {
      if (element.style.visibility === "hidden") {
        element.style.visibility = "visible";
      } else {
        element.style.visibility = "hidden";
      }
    }
  }

  render() {
    const eventList = this.props.state.filter(
      event =>
        event.location &&
        event.location.location &&
        event.location.location.latitude &&
        event.location.location.latitude
    );

    return (
      <div className="mapContainer">
        <button
          className="locateUserButton"
          onClick={this.setUserLocation}
          type="button"
        >
          <img className="marker" src={findLocation} alt="location" />
        </button>
        <div>
          <Map
            // eslint-disable-next-line
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
              height: "400px",
              width: "400px"
            }}
            center={[
              this.state.userLocation.longitude || -97,
              this.state.userLocation.latitude || 38
            ]}
            zoom={[this.state.userLocation.zoom || 2.5]}
            renderChildrenInPortal={true}
          >
            {eventList.map(event => (
              <div key={event.id}>
                <Marker
                  onClick={() => {
                    this.showPopup(event.id);
                  }}
                  coordinates={[
                    event.location.location.longitude,
                    event.location.location.latitude
                  ]}
                >
                  <img className="marker" src={markerImage} alt="marker" />
                </Marker>

                <Popup
                  className={`popup-${event.id}`}
                  style={{ display: "hidden", width: "200px" }}
                  anchor={"bottom"}
                  coordinates={[
                    event.location.location.longitude,
                    event.location.location.latitude
                  ]}
                  offset={{
                    "bottom-left": [12, -38],
                    bottom: [0, -38],
                    "bottom-right": [-12, -38]
                  }}
                >
                  <div className="popupText">
                    <p>
                      <strong>{event.title}</strong>
                    </p>
                    <p>{event.location.address_lines[0]}</p>
                  </div>
                </Popup>
              </div>
            ))}

            {this.state.userLocation.longitude &&
            this.state.userLocation.latitude ? (
              <Marker
                coordinates={[
                  parseFloat(this.state.userLocation.longitude),
                  parseFloat(this.state.userLocation.latitude)
                ]}
              >
                <img className="marker" src={locatorImage} alt="location" />
              </Marker>
            ) : null}
          </Map>
        </div>
      </div>
    );
  }
}

export default MapViewR;
