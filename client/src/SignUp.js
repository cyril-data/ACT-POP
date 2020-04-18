import React, { Component } from "react";
import axios from "axios";
const apiUrl = `http://localhost:8080`;

let documentData;

class SignUp extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleClick = this._handleClick.bind(this);
    // this._handleSubmitLog = this._handleSubmitLog.bind(this);

    this.state = {
      login: true,
      email: "",
      password: "",
      token: "",
      error_login: false,
    };
  }

  componentDidMount() {
    documentData = JSON.parse(localStorage.getItem("user"));

    if (localStorage.getItem("user")) {
      this.setState({
        email: documentData.email,
        token: documentData.token,
      });
    } else {
      this.setState({
        email: "",
        token: "",
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("user", JSON.stringify(nextState));
  }

  _handleClick() {
    this.setState({ login: !this.state.login });
    this.setState({ error_login: false });
  }

  render() {
    return (
      <div className="divOrga interaction3">
        <div className="card">
          {this.state.login ? <h1>Connexion</h1> : <h1>création de compte</h1>}
          <form onSubmit={this._handleSubmit}>
            <input
              className="inputOrga button--winona button--border-thin button--round-s"
              placeholder="email goes here..."
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              className="inputOrga button--winona button--border-thin button--round-s"
              placeholder="Password goes here..."
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            <div>
              <input
                className="inputOrga button--winona button--border-thin button--round-s"
                value={this.state.login ? "se connecter" : "créer son compte"}
                type="submit"
              />
              {this.state.error_login && (
                <span> mot de passe ou identifiant incorrect </span>
              )}
            </div>
          </form>
          {this.state.login && (
            <div>
              <span>
                {" "}
                <br /> Vous n'avez pas encore de compte ?{" "}
              </span>
              <button
                className="inputOrga button--winona button--border-thin button--round-s"
                id="Signup"
                data-text="Créez-en un"
                onClick={this._handleClick}
              >
                <span> Créez-en un ! </span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  handleChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  _handleSubmit() {
    event.preventDefault();
    console.log(this.state);
    localStorage.setItem("user", JSON.stringify(this.state));

    if (!this.state.login) {
      axios
        .post(apiUrl + "/api/auth/signup", this.state)
        .then((result) => {
          console.log("reponse signup api", result);
        })
        .catch((error) => {
          console.log("error signup api", error);
        });

      this.setState({
        login: true,
      });
    } else {
      axios
        .post(apiUrl + "/api/auth/login", this.state)
        .then((result) => {
          console.log("reponse login api", result);
          this.setState({
            token: result.data.token,
          });
          localStorage.setItem("user", JSON.stringify(this.state));
          this.props.menuForm();
          this.setState({ error_login: false });
        })
        .catch((error) => {
          console.log("error login api", error);
          this.setState({ error_login: true });
        });
    }
  }
}

export default SignUp;
