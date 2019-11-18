import React, { Component } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import markerImage from "../mapbox-icon.png";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoianNvbi0iLCJhIjoiY2szMXR0c3RuMGN5eDNjcHBrYzlhOXZhMiJ9.r4anECwkWAynyfKyQx4xHg"
});

class MapViewR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: {},
      latitude: 42.430472,
      longitude: -123.334102,
      zoom: 16
    };
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
      <Map
        className="mapContainer"
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "600px",
          width: "800px"
        }}
        center={[-97, 38]}
        zoom={[2.5]}
        renderChildrenInPortal={true}
      >
        {eventList.map(event => (
          <Marker
            key={event.id}
            coordinates={[
              event.location.location.longitude,
              event.location.location.latitude
            ]}
          >
            <img className="marker" src={markerImage} alt="marker" />
          </Marker>
        ))}
      </Map>
    );
  }
}

export default MapViewR;
