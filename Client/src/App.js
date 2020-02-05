"use strict";
import React, { Component } from "react";
import Compteur from "./Compteur";
import Interaction from "./Interaction";
import MapReact from "./MapReact";
import axios from "axios";
require("babel-core/register");
require("babel-polyfill");

const apiUrl = `http://localhost:8080`;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      orga: false,
      participation: false,
      soutien: false,
      changeMenu: false,
      idLutte: 1,
      position: [46.8, 3],
      users: []
    };
  }
  async createUser() {
    await axios.get(apiUrl + "/user-create");
    this.loadUsers();
  }

  async loadUsers() {
    const res = await axios.get(apiUrl + "/users");
    this.setState({
      users: res.data
    });
  }

  componentDidMount() {
    this.loadUsers();
  }

  handleClick(orga, participation, soutien, position, idLutte) {
    this.setState({
      orga: orga,
      participation: participation,
      soutien: soutien,
      position: position,
      changeMenu: !this.state.changeMenu,
      idLutte: idLutte
    });
  }

  render() {
    return (
      <div id="contenu">
        <Compteur />
        <div id="map_button">
          <MapReact inter={this.state} onClick={this.handleClick} />
          <Interaction inter={this.state} />
        </div>

        <button onClick={() => this.createUser()}>Create User</button>
        <p>Users list:</p>
        <ul>
          {this.state.users.map(user => (
            <li key={user._id}>id : {user.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
