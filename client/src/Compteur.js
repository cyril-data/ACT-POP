"use strict";
import React, { Component } from "react";

class Compteur extends Component {
  render() {
    return (
      // <div className="bigDiv button--border-thin button--round-s">
      <span>
        Nombre d'actions populaires aujourd'hui : {this.props.nbrActPop}
      </span>
      // </div>
    );
  }
}
export default Compteur;
