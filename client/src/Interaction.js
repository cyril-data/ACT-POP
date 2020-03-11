"use strict";
import React, { Component } from "react";
import Organisation from "./Organisation";
import Participation from "./Participation";
import Soutien from "./Soutien";

class Interaction extends Component {
  render() {
    const lutte = this.props.inter.luttes.find(
      element => element._id == this.props.inter.idLutte
    );

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
          <Organisation position={position} onSubmit={this.props.onSubmit} />
        ) : (
          participation | soutien && (
            <div>
              <div>
                {lutte.forme} {lutte.cause}
                <img src={lutte.imagePreviewUrl} className="previewImg" />;
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
