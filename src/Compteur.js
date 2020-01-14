"use strict";
import React, { Component } from "react";

class Compteur extends Component {
  render() {
    return (
      <div className="bigDiv button--border-thin button--round-s">
        <div> Nombre de personnes en lutte aujourd'hui : </div>
        <div id="compteur"> 1 </div>
      </div>
    );
  }
}
export default Compteur;
