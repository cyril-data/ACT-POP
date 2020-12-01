"use strict";
import React, { Component } from "react";
import axios from "axios";
import FormOrga from "./FormOrga";
import SignUp from "./SignUp";
import Login from "./Login";

const apiUrl = `http://localhost:8080`;

import { Container } from "reactstrap";

class Organisation extends Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleClickMenu = this._handleClickMenu.bind(this);
    this._handleMenuForm = this._handleMenuForm.bind(this);

    this.state = {
      menuOrga: true,
      menuForm: false,
      collectif: "",
      cause: "",
      date: "",
      lat: 0.0,
      lng: 0.0,
      affiche: "",
      popup: "",
      imagePreviewUrl: "",
    };
  }

  _handleMenuForm() {
    this.setState({
      menuForm: true,
    });
  }

  _handleClickMenu() {
    this.setState({
      menuOrga: true,
    });
  }

  _handleClick() {
    this.setState({
      menuOrga: false,
      lat: this.props.position.lat,
      lng: this.props.position.lng,
    });
  }

  render() {
    return (
      <div className="justify-center">
        {!this.state.menuForm ? (
          <SignUp menuForm={this._handleMenuForm} />
        ) : (
          <FormOrga
            position={this.props.position}
            _handleClickMenu={this._handleClickMenu}
            onClick={this.props.onClick}
            accueil={this.props.accueil}
          />
        )}
      </div>
    );
  }
}
export default Organisation;
