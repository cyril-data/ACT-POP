"use strict";
import React, { Component } from "react";
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

class Soutien extends Component {
  render() {
    const contain = (
      // <Container className="box bg-1" id="soutien">
      <Container id="soutien">
        <Button
          // className="button button--winona button--border-thin button--round-s"
          data-text="Je soutiens"
        >
          Je soutiens
          {/* <span> Je soutiens</span> */}
        </Button>
      </Container>
    );
    return contain;
  }
}
export default Soutien;
