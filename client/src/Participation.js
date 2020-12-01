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

class Participation extends Component {
  render() {
    const contain = (
      // <Container className="box bg-1" id="participe">
      <Container id="participe">
        <Button
          // className="button button--winona button--border-thin button--round-s"
          data-text="Je participe"
        >
          Je participe
          {/* <span>Je participe</span> */}
        </Button>
      </Container>
    );

    return contain;
  }
}
export default Participation;
