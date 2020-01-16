"use strict";
import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.draw();
  }

  // componentDidUpdate(prevProps) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.props.interaction !== prevProps.interaction) {
  //     console.log("this.props.interaction", this.props.interaction);
  //   }
  // }

  draw() {
    const mymap = L.map(document.querySelector(".map")).setView(
      [46.79942865121552, 2.9865881441615505],
      6
    );

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken:
          "pk.eyJ1IjoiY3lyaWwtZGF0YSIsImEiOiJjazNmemJ5N3AwOWo3M2NxY20xdWZnYjhmIn0.aJ1ZabNBNFijKFoi4ouWfg"
      }
    ).addTo(mymap);

    var marker = L.marker([46.79942865121552, 2.9865881441615505]).addTo(mymap);
    marker.on("click", onPopupClick);

    function onPopupClick(e) {
      var popup = L.popup();
      // console.log(this.props.interaction);
      // this.props.onClick([true, false, true]);

      let cible = document.getElementById("soutien");
      cible.className = "box bg-1 visible";

      cible = document.getElementById("participe");
      cible.className = "box bg-1 visible";

      cible = document.getElementById("orga");
      cible.className = "box bg-1 hide";

      popup
        .setLatLng(e.latlng)
        .setContent(
          "<b><a href=''>Manifestation </a></b>," +
            " <br> Contre la réforme des retraites "
          //   "<ul>" +
          //   "<li> Je participe </li>" +
          //   "<li> Je soutiens </li>" +
          //   "</ul>"
        )
        .openOn(mymap);
    }

    function onMapClick(e) {
      var popup = L.popup();

      let cible = document.getElementById("soutien");
      cible.className = "box bg-1 hide";

      cible = document.getElementById("participe");
      cible.className = "box bg-1 hide";

      cible = document.getElementById("orga");
      cible.className = "box bg-1 visible";
      cible = document.getElementById("orgaButton");
      cible.disabled = false;

      popup
        .setLatLng(e.latlng)
        .setContent(
          "<b>J'organise un événement ici : </b>," + e.latlng.toString()
          //   "<ul>" +
          //   "<li> Je participe </li>" +
          //   "<li> Je soutiens </li>" +
          //   "</ul>"
        )
        .openOn(mymap);
    }

    mymap.on("click", onMapClick);
  }

  render() {
    return (
      <div className="map" id="map">
        <svg id="my_dataviz" width="100vh" height="100vh"></svg>;
      </div>
    );
  }
}

export default Map;
