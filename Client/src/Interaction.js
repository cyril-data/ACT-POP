"use strict";
import React, { Component } from "react";
import Organisation from "./Organisation";
import Participation from "./Participation";
import Soutien from "./Soutien";
import DATA from "./BDD.js";

class Interaction extends Component {
  render() {
    const lutte = DATA.find(element => element.id == this.props.inter.idLutte);
    const {
      orga,
      participation,
      soutien,
      changeMenu,
      position
    } = this.props.inter;
    const condition = orga | participation | soutien;
    let classNamemap = "hidden";

    condition
      ? changeMenu
        ? (classNamemap = "interaction2")
        : (classNamemap = "interaction1")
      : (classNamemap = "hidden");

    return (
      <div id="interaction" className={classNamemap}>
        {orga ? (
          <Organisation position={position} />
        ) : (
          participation | soutien && (
            <div>
              <div>
                {lutte.forme} {lutte.cause}
              </div>
              <Participation />
              <Soutien />
            </div>
          )
        )}
      </div>
    );
  }
}
export default Interaction;
