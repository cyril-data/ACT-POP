"use strict";
import React, { Component } from "react";
import Organisation from "./Organisation";
import Participation from "./Participation";
import Soutien from "./Soutien";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Container,
  Col,
  Form,
  Label,
  FormGroup,
  Button,
  Input,
  FormText,
  Jumbotron,
  Badge,
} from "reactstrap";

class Interaction extends Component {
  constructor(props) {
    super(props);
    this.handleAccueil = this.handleAccueil.bind(this);
    this.state = {
      accueil: true,
    };
  }

  handleAccueil(accueil) {
    this.setState({
      accueil: accueil,
    });
  }

  render() {
    const actPop = this.props.inter.actPops.find(
      (element) => element._id == this.props.inter.idActPop
    );

    const {
      accueil,
      orga,
      participation,
      soutien,
      changeMenu,
      position,
    } = this.props.inter;

    const condition = orga | participation | soutien;
    let classNamemap = "hidden";

    condition
      ? changeMenu
        ? (classNamemap = "interaction2")
        : (classNamemap = "interaction1")
      : (classNamemap = "hidden");

    return (
      accueil &&
      // <div id="interaction" className={classNamemap}>
      // <div id="interaction">
      (orga ? (
        <Organisation
          position={position}
          onClick={this.props.onClick}
          accueil={this.props.accueil}
        />
      ) : (
        participation | soutien && (
          <div className="justify-center">
            <Jumbotron>
              <Container>
                <Row>
                  <Col text-center>
                    <h1 style={{ textAlign: "center" }}>{actPop.nom}</h1>
                  </Col>
                </Row>
                <Row>
                  <Card>
                    <CardBody>
                      <Row>
                        <CardTitle>Collectif: {actPop.collectif}</CardTitle>
                      </Row>

                      <Row>
                        {" "}
                        <CardTitle>Date: {actPop.date}</CardTitle>
                      </Row>

                      <Row>
                        <CardTitle>Affiche:</CardTitle>
                        <img
                          src={actPop.imagePreviewUrl}
                          className="previewImg"
                        />
                      </Row>
                    </CardBody>
                  </Card>
                </Row>
                <Row>
                  <Participation />
                </Row>
                <Row>
                  <Soutien />
                </Row>
              </Container>
            </Jumbotron>
            {/* <div>
              {actPop.forme} {actPop.nom}
              <img src={actPop.imagePreviewUrl} className="previewImg" />;
            </div>
            <Participation />
            <Soutien /> */}
          </div>
        )
      ))
      // </div>
    );
  }
}
export default Interaction;
