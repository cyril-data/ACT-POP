"use strict";
import React, { Component } from "react";

class Organisation extends Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
    this._handleChangeCollectif = this._handleChangeCollectif.bind(this);
    this._handleChangeCause = this._handleChangeCause.bind(this);
    this._handleChangedate = this._handleChangedate.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      menuOrga: false,
      collectif: "   ",
      cause: "   ",
      date: "   ",
      file: "",
      imagePreviewUrl: ""
    };
  }

  _handleClick() {
    this.setState({ menuOrga: true });
  }

  _handleChangeCollectif(event) {
    this.setState({ collectif: event.target.value });
  }
  _handleChangeCause(event) {
    this.setState({ cause: event.target.value });
  }
  _handleChangedate(event) {
    this.setState({ date: event.target.value });
  }

  _handleSubmit() {
    this.setState({ menuOrga: false });
    event.preventDefault();
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
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
                  onChange={this._handleChangeCollectif}
                />
              </label>
              <label className="labelOrga">
                Cause de la lutte :
                <input
                  className="inputOrga button--winona button--border-thin button--round-s"
                  type="text"
                  value={this.state.cause}
                  onChange={this._handleChangeCause}
                />
              </label>
              <label className="labelOrga">
                Date de la lutte :
                <input
                  className="inputOrga button--winona button--border-thin button--round-s"
                  type="text"
                  value={this.state.date}
                  onChange={this._handleChangedate}
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
