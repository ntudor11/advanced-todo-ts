import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { register } from "./Functions";
import { SAFE_PASS } from "./Constants";
// import { showAlert } from "./ShowAlert";

class Register extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      confirm_password: "",
      image: "",
      showAlert: false,
      alertText: "",
      isSuccess: null,
      validationErrors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.validateAll = this.validateAll.bind(this);
  }

  showAlert(alertText: string, isSuccess: boolean) {
    const { history } = this.props;

    this.setState({ showAlert: true, alertText, isSuccess });
    setTimeout(() => {
      this.setState({ showAlert: false, alertText: "", isSuccess: null });
      if (isSuccess) {
        history.push("/login");
      }
    }, 2000);
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [e.target.name]: e.target.value });
    this.validateAll();
  }

  validateAll() {
    const { email, name, password, confirm_password } = this.state;

    // enable validation with formik!
    this.setState({
      validationErrors: {
        vEmail:
          email.length > 3 ? null : "Email must be longer than 3 characters.",
        vPassword: password.match(SAFE_PASS)
          ? null
          : "Password must contain an uppercase character and a digit.",
        vName: name.length > 1 ? null : "Name must have at least 2 characters",
        vPasswordMatch:
          password === confirm_password ? null : "The passwords do not match.",
      },
    });
  }

  onSubmit(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { email, name, password, image } = this.state;

    const user = { email, name, password, image };

    register(user).then(({ data }: { data: any }) => {
      if (data.success) {
        this.showAlert("Your new account has been created.", true);
        console.log("success");
      } else {
        this.showAlert("The account could not be created.", false);
        this.setState({});
      }
    });
  }

  render() {
    const {
      email,
      name,
      password,
      confirm_password,
      image,
      alertText,
      isSuccess,
      showAlert,
    } = this.state;

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

                <Alert
                  show={showAlert}
                  id="alert-register"
                  variant={isSuccess ? "success" : "danger"}
                >
                  {alertText}
                </Alert>

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
                        onBlur={this.validateAll}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={this.onChange}
                        onBlur={this.validateAll}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={this.onChange}
                        onBlur={this.validateAll}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Control
                        type="password"
                        name="confirm_password"
                        placeholder="Repeat Password"
                        value={confirm_password}
                        onChange={this.onChange}
                        onBlur={this.validateAll}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        name="image"
                        placeholder="Enter Image URL"
                        value={image}
                        onChange={this.onChange}
                        onBlur={this.validateAll}
                      />
                    </Form.Group>

                    <Button
                      block
                      className="btnDefault"
                      type="submit"
                      variant="outline-info"
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
