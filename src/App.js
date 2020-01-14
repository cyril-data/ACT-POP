"use strict";
import React, { Component } from "react";
import Map from "./Map";
import Organisation from "./Organisation";
import Participation from "./Participation";
import Soutien from "./Soutien";
import Compteur from "./Compteur";

class App extends Component {
  render() {
    return (
      <div id="contenu">
        <div id="divCompteur">
          <Compteur />
        </div>

        <div id="map_button">
          <div className="map" id="map">
            <Map />
          </div>
          <div id="interaction">
            <Organisation />
            <Participation />
            <Soutien />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
