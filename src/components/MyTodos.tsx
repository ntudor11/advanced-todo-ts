import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { login } from './AdminFunctions';

class MyTodos extends Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e: any) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e: any) {
    e.preventDefault();

    // login(this.state).then(({ data }) => {
    //   if (data.success) {
    //     const { setLoggedIn } = this.props;
    //     setLoggedIn(true);
    //     console.log('success');
    //     history.push(`/`);
    //     // window.location.reload();
    //   } else {
    //     this.setState({});
    //   }
    // });
  }

  render() {
    const { email, password } = this.state;

    return (
      <Container fluid className="body">
        <Row
          id="row-login"
          className="justify-content-sm-center row-loginSignup"
        >
          <Col xs={{ span: 12 }} sm={8}>
            <Row className="justify-content-sm-center">
              <Col sm={8} md={8} className="loginBlock">
                <h2>My Todos</h2>

                <p>Authorised access only.</p>

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

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Button
                      block
                      className="btnDefault"
                      type="submit"
                      variant="dark"
                    >
                      Login
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

export default MyTodos;
