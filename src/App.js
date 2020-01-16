"use strict";
import React, { Component } from "react";
import Map from "./Map";
import Compteur from "./Compteur";
import Interaction from "./Interaction";
import SimpleExample from "./SimpleExample";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      orga: false,
      participation: false,
      soutien: false
    };
  }

  handleClick(orga, participation, soutien) {
    this.setState({
      orga: orga,
      participation: participation,
      soutien: soutien
    });
  }

  render() {
    console.log("APP state", this.state);

    return (
      <div id="contenu">
        <Compteur />
        <div id="map_button">
          <SimpleExample onClick={this.handleClick} inter={this.state} />

          <Interaction inter={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
