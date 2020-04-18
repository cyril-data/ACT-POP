"use strict";
import React, { creationRef, Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
// import DATA from "./BDD.js";

const Tiles =
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
const Attr =
  '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const mapCenter = [46.79942865121552, 2.9865881441615505];
const zoomLevel = 6;

export default class MapReact extends Component {
  constructor(props) {
    super(props);
    this.handleClickPopup = this.handleClickPopup.bind(this);
    this.handleClickMap = this.handleClickMap.bind(this);
    this.state = {
      currentZoomLevel: zoomLevel
    };
  }

  handleClickPopup(e, idLutte) {
    console.log("e.latlng", e.latlng);
    this.props.onClick(false, true, true, e.latlng, idLutte);
  }

  handleClickMap(e) {
    this.props.onClick(true, false, false, e.latlng);
  }

  render() {
    // this.props.inter.luttes.map(lutte => {
    //   console.log("lutte", lutte);
    // });
    const luttes = this.props.inter.luttes;

    const map = (
      <Map center={mapCenter} zoom={zoomLevel} onClick={this.handleClickMap}>
        <TileLayer
          attribution={Attr}
          url={Tiles}
          accessToken={
            "pk.eyJ1IjoiY3lyaWwtZGF0YSIsImEiOiJjazNmemJ5N3AwOWo3M2NxY20xdWZnYjhmIn0.aJ1ZabNBNFijKFoi4ouWfg"
          }
          id={"mapbox/streets-v11"}
        />
        this.props.inter.orga && (
        <Marker position={this.props.inter.position} key={"newOrga"}></Marker>)
        {luttes.map(lutte => {
          return (
            <Marker
              position={[lutte.lat, lutte.lng]}
              key={lutte._id}
              onClick={e => this.handleClickPopup(e, lutte._id)}
            >
              <Popup>
                {lutte.collectif} <br /> <strong> {lutte.cause} </strong>
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
