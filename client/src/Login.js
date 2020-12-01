import React, { Component } from "react";
import axios from "axios";
const apiUrl = `http://localhost:8080`;

let documentData;

class Login extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      token: ""
    };
  }

  componentDidMount() {
    documentData = JSON.parse(localStorage.getItem("user"));

    if (localStorage.getItem("user")) {
      this.setState({
        email: documentData.email,
        token: documentData.token
      });
    } else {
      this.setState({
        email: "",
        token: ""
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("user", JSON.stringify(nextState));
  }

  render() {
    return (
      <div className="center">
        <div className="card">
          <h1>Creation compte</h1>
          <form onSubmit={this._handleSubmit}>
            <input
              className="form-item"
              placeholder="email goes here..."
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              className="form-item"
              placeholder="Password goes here..."
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input className="form-submit" value="SUBMIT" type="submit" />
          </form>
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

    axios
      .post(apiUrl + "/api/auth/login", this.state)
      .then(result => {
        console.log("reponse login api", result);
        this.setState({
          token: result.data.token
        });
        localStorage.setItem("user", JSON.stringify(this.state));
      })
      .catch(error => {
        console.log("error login api", error);
      });
  }
}

export default Login;
