import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoianNvbi0iLCJhIjoiY2szMXR0c3RuMGN5eDNjcHBrYzlhOXZhMiJ9.r4anECwkWAynyfKyQx4xHg";

let map;

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -96,
      lat: 39,
      zoom: 2.5
    };

    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );

    map.on("move", () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    const eventList = this.props.state;
    return (
      <div className="MapView">
        {/* The mapContainer ref specifies that map should be drawn to the HTML page in a new <div> element. */}
        <div className="mapContainer" ref={el => (this.mapContainer = el)} />

        {/* populate the map with markers */}
      </div>
    );
  }
}

export default MapView;
