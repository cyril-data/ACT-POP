"use strict";
import React, { Component } from "react";

class Participation extends Component {
  render() {
    const contain = (
      <div className="box bg-1" id="participe">
        <button
          className="button button--winona button--border-thin button--round-s"
          data-text="Je participe"
        >
          <span>Je participe</span>
        </button>
      </div>
    );

    return contain;
  }
}
export default Participation;
