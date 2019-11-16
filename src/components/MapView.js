import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoianNvbi0iLCJhIjoiY2szMXR0c3RuMGN5eDNjcHBrYzlhOXZhMiJ9.r4anECwkWAynyfKyQx4xHg";

class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 2
    };

    this.mapContainer = React.createRef();
  }

  componentDidMount() {
    console.log(this.mapContainer);

    const map = new mapboxgl.Map({
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
    return (
      <div>
        <div>
          <div className="sidebarStyle">
            {/* used to display the longitude, latitude, and zoom of the map. */}
            Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
            {this.state.zoom}
          </div>
        </div>

        {/* The mapContainer ref specifies that map should be drawn to the HTML page in a new <div> element. */}
        <div className="mapContainer" ref={el => (this.mapContainer = el)} />
      </div>
    );
  }
}

export default MapView;
