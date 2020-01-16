"use strict";
import React, { Component } from "react";

class Compteur extends Component {
  render() {
    return (
      <div className="bigDiv button--border-thin button--round-s">
        <div id="compteur">Nombre de personnes en lutte aujourd'hui : 1</div>
      </div>
    );
  }
}
export default Compteur;
