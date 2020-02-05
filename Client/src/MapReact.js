"use strict";
import React, { createRef, Component } from "react";
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
    this.handleClickPopup = this.handleClickPopup.bind(this);
    this.handleClickMap = this.handleClickMap.bind(this);
    this.state = {
      currentZoomLevel: zoomLevel
    };
  }

  handleClickPopup(e, idLutte) {
    this.props.onClick(false, true, true, e.latlng, idLutte);
  }

  handleClickMap(e) {
    this.props.onClick(true, false, false, e.latlng);
  }

  render() {
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
        {DATA.map(lutte => {
          return (
            <Marker
              position={lutte.lieu}
              key={lutte.id}
              onClick={e => this.handleClickPopup(e, lutte.id)}
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
