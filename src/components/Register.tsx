import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { login } from "./Functions";

class Register extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      confirm_password: "",
      image: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const { history } = this.props;
    const { email, name, password, image } = this.state;

    const user = { email, name, password, image };

    login(user).then(({ data }: { data: any }) => {
      if (data.success) {
        const { setLoggedIn } = this.props;
        setLoggedIn(true);
        console.log("success");
        history.push("/todos");
        // window.location.reload();
      } else {
        this.setState({});
      }
    });
  }

  render() {
    const { email, name, password, confirm_password, image } = this.state;

    return (
      <Container fluid className="body">
        <Row
          id="row-login"
          className="justify-content-sm-center row-loginSignup"
        >
          <Col xs={{ span: 12 }} sm={8}>
            <Row className="justify-content-sm-center">
              <Col sm={8} md={8} className="loginBlock">
                <h2>Register</h2>

                <Form noValidate onSubmit={this.onSubmit}>
                  <Form.Group
                    className="formTemplate"
                    controlId="exampleForm.ControlSelect1"
                  >
                    <br />

                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="confirm_password"
                        placeholder="Repeat Password"
                        value={confirm_password}
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        name="image"
                        placeholder="Enter Image URL"
                        value={image}
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Button
                      block
                      className="btnDefault"
                      type="submit"
                      variant="dark"
                    >
                      Register
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
