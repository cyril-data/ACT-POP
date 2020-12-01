import React, { Component } from "react";
import axios from "axios";
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
                {this.state.login ? (
                  <CardTitle>Connection :</CardTitle>
                ) : (
                  <CardTitle>Création de compte :</CardTitle>
                )}
                <Form onSubmit={this._handleSubmit}>
                  <FormGroup controlId="formBasicEmail">
                    <Row>
                      <Col>
                        <Label for="exampleEmail">Adresse mail</Label>
                      </Col>
                      {/* <Label for="exampleEmail">Email</Label> */}
                      <Col>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          type="text"
                          value={this.state.email}
                          onChange={this.handleChange}
                        />
                        <FormText className="text-muted">
                          Nous ne partagerons jamais votre email avec quelqu'un
                          d'autre.
                        </FormText>
                      </Col>
                    </Row>
                  </FormGroup>

                  <FormGroup controlId="formBasicPassword">
                    <Row>
                      <Col>
                        <Label>Mot de passe</Label>
                      </Col>
                      <Col>
                        <Input
                          type="password"
                          placeholder="password"
                          name="password"
                          type="text"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <Input
                    value={
                      this.state.login ? "se connecter" : "créer son compte"
                    }
                    type="submit"
                  />
                  {this.state.error_login && (
                    <FormText className="text-muted">
                      mot de passe ou identifiant incorrect
                    </FormText>
                  )}
                  {/* </div> */}
                </Form>

                {this.state.login && (
                  <FormGroup controlId="formBasicPassword">
                    <Container fluid>
                      <Row>
                        <Col sm={{ size: "auto" }}>
                          <FormText className="text-muted">
                            Vous n'avez pas encore de compte ?{" "}
                          </FormText>
                        </Col>
                        <Col sm={{ size: "auto", offset: 1 }}>
                          <Button
                            // className="inputOrga button--winona button--border-thin button--round-s"
                            id="Signup"
                            data-text="Créez-en un"
                            onClick={this._handleClick}
                          >
                            Créez-en un !
                          </Button>
                        </Col>
                      </Row>
                    </Container>
                  </FormGroup>
                )}
              </CardBody>
              {/* </div> */}
            </Card>
          </Row>
        </Container>
      </Jumbotron>
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
