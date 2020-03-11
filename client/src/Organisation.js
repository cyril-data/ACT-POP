"use strict";
import React, { Component } from "react";
import axios from "axios";

const apiUrl = `http://localhost:8080`;

class Organisation extends Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      menuOrga: false,
      collectif: "",
      cause: "",
      date: "",
      lat: 0.0,
      lng: 0.0,
      affiche: "",
      popup: "",
      imagePreviewUrl: ""
    };
  }

  _handleClick() {
    this.setState({ menuOrga: true });
    this.setState({
      lat: this.props.position.lat,
      lng: this.props.position.lng
    });
  }

  onChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  _handleSubmit() {
    event.preventDefault();
    this.setState({ menuOrga: false });
    axios.post(apiUrl + "/lutte-creation", this.state).then(result => {
      this.props.onSubmit();
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        affiche: file,
        imagePreviewUrl: reader.result
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

    const lat = this.props.position.lat.toFixed(2);
    const lng = this.props.position.lng.toFixed(2);

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} className="previewImg" />;
    }

    return (
      <div className="box bg-1" id="orga">
        <button
          className="button button--winona button--border-thin button--round-s"
          id="orgaButton"
          data-text="J'organise"
          onClick={this._handleClick}
        >
          <span> J'organise </span>
        </button>
        {this.state.menuOrga && (
          <div className="divOrga interaction3" id="orga">
            <div>Lieu de la lutte : </div>
            <div className="lieuOrga">{`${lat}, ${lng} `}</div>

            <form onSubmit={this._handleSubmit}>
              <label className="labelOrga">
                Collectif organisateur :
                <input
                  className="inputOrga button--winona button--border-thin button--round-s"
                  type="text"
                  value={this.state.collectif}
                  name="collectif"
                  onChange={this.onChange}
                />
              </label>
              <label className="labelOrga">
                Cause de la lutte :
                <input
                  className="inputOrga button--winona button--border-thin button--round-s"
                  type="text"
                  value={this.state.cause}
                  name="cause"
                  onChange={this.onChange}
                />
              </label>
              <label className="labelOrga">
                Date de la lutte : (YYYY-MM-DD)
                <input
                  className="inputOrga button--winona button--border-thin button--round-s"
                  type="text"
                  value={this.state.date}
                  name="date"
                  onChange={this.onChange}
                />
              </label>
              <label
                className="inputOrga button--winona button--border-thin button--round-s"
                htmlFor="selectAffiche"
              >
                Selectionner l'affiche en pdf
              </label>
              <div className="imgPreview">{$imagePreview}</div>
              <input
                type="file"
                id="selectAffiche"
                name="selectAffiche"
                text={"Upload File"}
                name="file"
                onChange={this._handleImageChange}
              />
              <input
                className="inputOrga button--winona button--border-thin button--round-s"
                type="submit"
                value="Je confirme"
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}
export default Organisation;
