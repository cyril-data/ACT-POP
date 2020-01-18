"use strict";
import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import DATA from "./BDD.js";

const Tiles =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
const Attr =
  '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [46.79942865121552, 2.9865881441615505];
const zoomLevel = 6;

export default class MapReact extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { currentZoomLevel: zoomLevel };
  }

  handleClick() {
    console.log("MapReact handleClick");
    this.props.onClick(false, true, true);
  }

  render() {
    const position = [46.79942865121552, 2.98658814416155];

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
        {/* <Marker
          position={DATA[0].lieu}
          key={`marker`}
          onClick={this.handleClick}
        >
          <Popup>
            {"lutte.forme"} <br /> <strong> {"lutte.cause"} </strong>
          </Popup>
        </Marker>
        ; */}
        {DATA.map(lutte => {
          console.log("lutte.lieu", lutte.lieu, lutte.cause, lutte.forme);
          return (
            <Marker
              position={lutte.lieu}
              key={lutte.id}
              onClick={this.handleClick}
            >
              <Popup>
                {lutte.forme} <br /> <strong> {lutte.cause} </strong>
              </Popup>
            </Marker>
          );
        })}
      </Map>
    );

    return (
      <div className="map" id="map">
        {map}
      </div>
    );
  }
}
