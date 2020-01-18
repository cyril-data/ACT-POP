"use strict";
import React, { Component } from "react";

class Organisation extends Component {
  render() {
    return (
      <div className="box bg-1" id="orga">
        <button
          className="button button--winona button--border-thin button--round-s"
          id="orgaButton"
          data-text="J'organise"
          disabled
        >
          <span> J'organise </span>
        </button>
      </div>
    );
  }
}
export default Organisation;
