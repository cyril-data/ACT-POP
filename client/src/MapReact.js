"use strict";
import React, { creationRef, Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
// import DATA from "./BDD.js";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Container,
  Col,
  Form,
  Label,
  FormGroup,
  Button,
  Input,
  FormText,
  Jumbotron,
  Badge,
} from "reactstrap";

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
      currentZoomLevel: zoomLevel,
    };
  }

  handleClickPopup(e, idActPop, actPop) {
    console.log("e.latlng", e.latlng, idActPop, actPop);

    this.props.onClick(false, true, true, e.latlng, idActPop);
  }

  handleClickMap(e) {
    this.props.onClick(true, false, false, e.latlng);
  }

  render() {
    // this.props.inter.actPops.map(actPop => {
    //   console.log("actPop", actPop);
    // });
    const actPops = this.props.inter.actPops;

    // const map = (
    //   <Map center={mapCenter} zoom={zoomLevel} onClick={this.handleClickMap}>
    //     <TileLayer
    //       attribution={Attr}
    //       url={Tiles}
    //       accessToken={
    //         "pk.eyJ1IjoiY3lyaWwtZGF0YSIsImEiOiJjazNmemJ5N3AwOWo3M2NxY20xdWZnYjhmIn0.aJ1ZabNBNFijKFoi4ouWfg"
    //       }
    //       id={"mapbox/streets-v11"}
    //     />
    //     this.props.inter.orga && (
    //     <Marker position={this.props.inter.position} key={"newOrga"}></Marker>)
    //     {actPops.map((actPop) => {
    //       return (
    //         <Marker
    //           position={[actPop.lat, actPop.lng]}
    //           key={actPop._id}
    //           onClick={(e) => this.handleClickPopup(e, actPop._id)}
    //         >
    //           <Popup>
    //             {actPop.collectif} <br /> <strong> {actPop.cause} </strong>
    //           </Popup>
    //         </Marker>
    //       );
    //     })}
    //   </Map>
    // );

    return (
      <div className="map" id="map">
        {/* <div className="map" id="map"> */}
        <Map
          center={mapCenter}
          zoom={zoomLevel}
          onClick={this.handleClickMap}
          // style={{ width: "100%", height: "100vh" }}
        >
          <TileLayer
            attribution={Attr}
            url={Tiles}
            accessToken={
              "pk.eyJ1IjoiY3lyaWwtZGF0YSIsImEiOiJjazNmemJ5N3AwOWo3M2NxY20xdWZnYjhmIn0.aJ1ZabNBNFijKFoi4ouWfg"
            }
            id={"mapbox/streets-v11"}
          />
          this.props.inter.orga && (
          <Marker position={this.props.inter.position} key={"newOrga"}></Marker>
          )
          {actPops.map((actPop) => {
            return (
              <Marker
                position={[actPop.lat, actPop.lng]}
                key={actPop._id}
                onClick={(e) => this.handleClickPopup(e, actPop._id, actPop)}
              >
                <Popup>
                  {actPop.collectif} <br /> <strong> {actPop.nom} </strong>
                </Popup>
              </Marker>
            );
          })}
        </Map>
        {/* </div> */}
      </div>
    );
  }
}
