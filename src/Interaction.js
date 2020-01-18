"use strict";
import React, { Component } from "react";
import Organisation from "./Organisation";
import Participation from "./Participation";
import Soutien from "./Soutien";

class Interaction extends Component {
  render() {
    console.log(
      "Interaction  : ",
      this.props.inter.orga,
      this.props.inter.participation,
      this.props.inter.soutien
    );

    const condition =
      this.props.inter.orga |
      this.props.inter.participation |
      this.props.inter.soutien;

    console.log("Interaction condition", condition);
    let classNamemap = "interaction";

    condition ? (classNamemap = "interaction") : (classNamemap = "");
    return (
      <div id="interaction" className={classNamemap}>
        {this.props.inter.orga && <Organisation />}
        {this.props.inter.participation && <Participation />}
        {this.props.inter.soutien && <Soutien />}
      </div>
    );
  }
}
export default Interaction;
