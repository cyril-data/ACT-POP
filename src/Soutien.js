"use strict";
import React, { Component } from "react";

class Soutien extends Component {
  render() {
    const contain = (
      <div className="box bg-1" id="soutien">
        <button
          className="button button--winona button--border-thin button--round-s"
          data-text="Je soutiens"
        >
          <span> Je soutiens</span>
        </button>
      </div>
    );
    return contain;
  }
}
export default Soutien;
