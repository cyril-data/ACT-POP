"use strict";
import React, { Component } from "react";
import Compteur from "./Compteur";
import Interaction from "./Interaction";
import MapReact from "./MapReact";
import axios from "axios";
require("babel-core/register");
require("babel-polyfill");

const apiUrl = `http://localhost:8080`;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.loadluttes = this.loadluttes.bind(this);
    this.handleAccueil = this.handleAccueil.bind(this);

    this.state = {
      accueil: true,
      orga: false,
      participation: false,
      soutien: false,
      changeMenu: false,
      position: [46.8, 3],
      luttes: [],
      idLutte: 1
    };
  }

  async loadluttes() {
    const res = await axios.get(apiUrl + "/api/lutte");
    console.log("load Lutte dans APP", res.data);
    this.setState({
      luttes: res.data
    });
  }
  // ***
  // Recherche d'un element dans la base est remplacée par une
  // recherche dans le tableau lutte[] de React composant Interaction
  //
  // async loadlutte() {
  //   const res = await axios.get(apiUrl + "/api/lutte" + this.state.idLutte);
  //   this.setState({
  //     lutte: res.data
  //   });
  // }
  // ***

  componentDidMount() {
    this.loadluttes();
  }

  handleAccueil(accueil) {
    this.loadluttes();
    this.setState({
      accueil: accueil
    });
  }

  handleClick(orga, participation, soutien, position, idLutte) {
    this.setState({
      accueil: true,
      orga: orga,
      participation: participation,
      soutien: soutien,
      position: position,
      changeMenu: !this.state.changeMenu,
      idLutte: idLutte
    });
    // this.loadluttes();
  }

  render() {
    return (
      <div id="contenu">
        <Compteur />
        <div id="map_button">
          <MapReact inter={this.state} onClick={this.handleClick} />
          <Interaction
            inter={this.state}
            onClick={this.handleClick}
            accueil={this.handleAccueil}
          />
        </div>
      </div>
    );
  }
}

export default App;
