import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { login } from "../components/Functions";

interface IProps {
  history: any;
  setLoggedIn: any;
}

interface IState {
  email: string;
  password: string;
}

type DataProps = {
  success: boolean;
};

class Login extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    } as { [K in keyof IState]: IState[K] });
  }

  onSubmit(e: React.SyntheticEvent<HTMLInputElement>) {
    e.preventDefault();

    const { history, setLoggedIn } = this.props;
    const { email, password } = this.state;

    const user = { email, password };

    login(user).then(({ data }: { data: DataProps }) => {
      if (data.success) {
        setLoggedIn(true);
        history.push("/todos");
      } else {
        this.setState({});
      }
    });
  }

  render() {
    const { email, password } = this.state;

    console.log(typeof this.props.history);

    return (
      <Container fluid className="body">
        <Row
          id="row-login"
          className="justify-content-sm-center row-loginSignup"
        >
          <Col xs={{ span: 12 }} sm={8}>
            <Row className="justify-content-sm-center">
              <Col sm={8} md={8} className="loginBlock">
                <h2>Log In</h2>

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
                      variant="outline-info"
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

export default Login;
