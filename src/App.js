"use strict";
import React, { Component } from "react";
import Compteur from "./Compteur";
import Interaction from "./Interaction";
import MapReact from "./MapReact";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      orga: false,
      participation: false,
      soutien: false,
      changeMenu: false,
      idLutte: 1,
      position: [46.8, 3]
    };
  }

  handleClick(orga, participation, soutien, position, idLutte) {
    this.setState({
      orga: orga,
      participation: participation,
      soutien: soutien,
      position: position,
      changeMenu: !this.state.changeMenu,
      idLutte: idLutte
    });
  }

  render() {
    return (
      <div id="contenu">
        <Compteur />
        <div id="map_button">
          <MapReact inter={this.state} onClick={this.handleClick} />
          <Interaction inter={this.state} />
        </div>
      </div>
    );
  }
}

export default App;
