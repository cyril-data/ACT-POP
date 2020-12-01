"use strict";
import React, { Component } from "react";
import Compteur from "./Compteur";
import Interaction from "./Interaction";
import MapReact from "./MapReact";
import axios from "axios";
require("babel-core/register");
require("babel-polyfill");

const apiUrl = `http://localhost:8080`;

// // react plugin used to create charts
import { Line, Bar, Doughnut, Scatter } from "react-chartjs-2";

// reactstrap components
import { Row, Container } from "reactstrap";
// import {
//   Button,
//   ButtonGroup,
//   Card,
//   CardHeader,
//   CardBody,
//   CardTitle,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   UncontrolledDropdown,
//   Label,
//   FormGroup,
//   Form,
//   Input,
//   Table,
//   Row,
//   Col,
//   UncontrolledTooltip,
// } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.loadActPops = this.loadActPops.bind(this);
    this.handleAccueil = this.handleAccueil.bind(this);

    this.state = {
      accueil: false,
      orga: false,
      participation: false,
      soutien: false,
      changeMenu: false,
      position: [46.8, 3],
      actPops: [],
      idActPop: 1,
    };
  }

  async loadActPops() {
    const res = await axios.get(apiUrl + "/api/actPop");
    console.log("load ActPop dans APP", res.data);
    this.setState({
      actPops: res.data,
    });
  }
  // ***
  // Recherche d'un element dans la base est remplacée par une
  // recherche dans le tableau actPop[] de React composant Interaction
  //
  // async loadactPop() {
  //   const res = await axios.get(apiUrl + "/api/actPop" + this.state.idActPop);
  //   this.setState({
  //     actPop: res.data
  //   });
  // }
  // ***

  componentDidMount() {
    this.loadActPops();
  }

  handleAccueil(accueil) {
    this.loadActPops();
    this.setState({
      accueil: accueil,
    });
  }

  handleClick(orga, participation, soutien, position, idActPop) {
    this.setState({
      accueil: true,
      orga: orga,
      participation: participation,
      soutien: soutien,
      position: position,
      changeMenu: !this.state.changeMenu,
      idActPop: idActPop,
    });
    // this.loadActPops();
  }

  render() {
    return (
      <Container id="contenu">
        <Row>
          <Compteur nbrActPop={this.state.actPops.length} />
        </Row>
        <Row>
          <MapReact inter={this.state} onClick={this.handleClick} />
        </Row>
        <Interaction
          inter={this.state}
          onClick={this.handleClick}
          accueil={this.handleAccueil}
        />
      </Container>
    );
  }
}

export default App;
