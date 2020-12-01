"use strict";
import React, { Component } from "react";
import axios from "axios";
const apiUrl = `http://localhost:8080`;

import Calendar from "react-calendar";

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

class FormOrga extends Component {
  constructor(props) {
    super(props);
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.loadactPops = this.loadactPops.bind(this);
    this.state = {
      menuOrga: true,
      collectif: "",
      nom: "",
      date: "",
      lat: 0.0,
      lng: 0.0,
      affiche: "",
      popup: "",
      imagePreviewUrl: "",
      date_calendar: new Date(),
    };
  }

  // async loadactPops() {
  //   const res = await axios.get(apiUrl + "/api/actPop");
  //   console.log("load ActPop dans form", res.data);
  //   this.setState({
  //     actPops: res.data,
  //   });
  // }

  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);

    this.setState({
      lat: this.props.position.lat,
      lng: this.props.position.lng,
    });
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.setState({ menuOrga: true });

    const token = JSON.parse(localStorage.getItem("user")).token;

    console.log("token Org", token);
    let config = {
      headers: {
        Authorization: `Basic ${token}`,
      },
    };
    this.props._handleClickMenu();

    axios
      .post(apiUrl + "/api/actPop/creation", this.state, config)
      .then((resp) => {
        console.log(resp.data);
        this.props.accueil(false);
        // console.log(
        //   "Form lat lng",
        //   this.props.position.lat,
        //   this.props.position.lng
        // );

        // this.props.onClick(true, false, false, {
        //   lat: this.props.position.lat,
        //   lng: this.props.position.lng
        // });
      });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log("file", file);
    reader.onloadend = () => {
      this.setState({
        affiche: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    console.log(
      "Orga lat, lng props",
      this.props.position.lat,
      this.props.position.lng
    );

    const [lat, lng] = [
      this.props.position.lat.toFixed(2),
      this.props.position.lng.toFixed(2),
    ];
    // const lng = this.props.position.lng.toFixed(2);

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} className="previewImg" />;
    }

    return (
      <Jumbotron>
        <Container>
          <Row>
            <Col text-center>
              <h1 style={{ textAlign: "center" }}>J'organise mon action</h1>
            </Col>
          </Row>
          <Row>
            <Card>
              <CardBody>
                <Row>
                  <CardTitle> Lieu : {`${lat}, ${lng} `} </CardTitle>
                </Row>
                {/* <div>Lieu : </div>
            <div className="lieuOrga">{`${lat}, ${lng} `}</div> */}

                <Form onSubmit={this._handleSubmit}>
                  <Row>
                    <Col>
                      <Label>
                        Collectif organisateur :
                        <Input
                          // className="inputOrga button--winona button--border-thin button--round-s"
                          type="text"
                          value={this.state.collectif}
                          name="collectif"
                          onChange={this.onChange}
                        />
                      </Label>
                    </Col>
                    <Col>
                      <Label>
                        Nom de l'action :
                        <Input
                          // className="inputOrga button--winona button--border-thin button--round-s"
                          type="text"
                          value={this.state.nom}
                          name="nom"
                          onChange={this.onChange}
                        />
                      </Label>
                    </Col>
                  </Row>

                  <Row>
                    <Label>Date </Label>
                    <FormText className="text-muted"> (YYYY-MM-DD) </FormText>

                    <Input
                      // className="inputOrga button--winona button--border-thin button--round-s"
                      type="text"
                      value={this.state.date}
                      name="date"
                      onChange={this.onChange}
                    />

                    {/* <Calendar
              onChange={this.onChange}
              value={this.state.date_calendar}
            /> */}
                  </Row>

                  <Row>
                    <Label
                    // className="inputOrga button--winona button--border-thin button--round-s"
                    // htmlFor="selectAffiche"
                    >
                      Tract
                    </Label>
                    <FormText className="text-muted"> (en pdf) </FormText>

                    <input
                      className="fileInput"
                      type="file"
                      // id="selectAffiche"
                      // name="selectAffiche"
                      // text={"Upload File"}
                      onChange={this._handleImageChange}
                    />
                    <FormText className="imgPreview">{$imagePreview}</FormText>
                  </Row>

                  <Input
                    // className="inputOrga button--winona button--border-thin button--round-s"
                    type="submit"
                    value="Je confirme"
                  />
                </Form>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </Jumbotron>
    );
  }
}
export default FormOrga;
