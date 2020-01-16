import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const Tiles =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
const Attr =
  '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [46.79942865121552, 2.9865881441615505];
const zoomLevel = 6;

export default class SimpleExample extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { currentZoomLevel: zoomLevel };
  }

  handleClick() {
    console.log("SimpleExample handleClick");
    this.props.onClick(true, false, false);
  }

  render() {
    const position = [46.79942865121552, 2.98658814416155];
    // console.log("SimpleExample props", this.props.onClick);

    const map = (
      <Map center={mapCenter} zoom={zoomLevel}>
        <TileLayer
          attribution={Attr}
          url={Tiles}
          accessToken={
            "pk.eyJ1IjoiY3lyaWwtZGF0YSIsImEiOiJjazNmemJ5N3AwOWo3M2NxY20xdWZnYjhmIn0.aJ1ZabNBNFijKFoi4ouWfg"
          }
          id={"mapbox/streets-v11"}
        />
        <Marker position={position} key={`marker`} onClick={this.handleClick}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    );

    return (
      <div className="map" id="map">
        {map}
      </div>
    );
  }
}
