import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "./Functions";
import DarkModeToggle from "./DarkModeToggle";

class NavBar extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      isScrolled: false,
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", () => {
      const scroll = window.scrollY <= 10;
      this.setState({
        isScrolled: scroll,
      });
    });

    try {
      fetch("/checkToken")
        .then((data) => data.json())
        .then(({ userId, image, name }) =>
          this.setState({ loggedInUser: userId, image, name })
        );
    } catch (e) {
      console.log(`${e} not authenticated`);
    }
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.loggedIn !== this.props.loggedIn) {
      try {
        fetch("/checkToken")
          .then((data) => data.json())
          .then(({ userId, image, name }) =>
            this.setState({ loggedInUser: userId, image, name })
          );
      } catch (e) {
        console.log(`${e} not authenticated`);
      }
    }
  }

  logOut(e: any) {
    const { setLoggedIn } = this.props;
    e.preventDefault();
    const { history } = this.props;
    logout();
    setLoggedIn(false);
    history.push(`/`);
  }

  render() {
    const { isScrolled, image } = this.state;
    const { loggedIn, isDark } = this.props;

    const loginRegLink = (
      <Navbar
        bg={isDark ? "dark" : "light"}
        variant={isDark ? "dark" : "light"}
        fixed="top"
        collapseOnSelect
        id={isScrolled ? "" : "navScrolled"}
        className={isScrolled ? "navUnscrolled" : "navScrolled"}
        expand="md"
      >
        <Navbar.Brand>
          <Link to="/">
            {/* <img src={ImpactLogo} className="App-logo" alt="logo" style={{ width: '80px' }} /> */}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggle x"
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </Navbar.Toggle>
        <Navbar.Collapse
          className="ml-auto justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="ml-auto">
            <NavLink
              // as={Link}
              exact
              // eventkey="1"
              activeClassName="active"
              to="/"
              className={`ml-auto nav-link underline-from-center ${
                isScrolled ? "" : "navitem-scroll"
              }`}
            >
              Home
            </NavLink>

            <NavLink
              // as={Link}
              exact
              activeClassName="active"
              to="/register"
              // eventkey="5"
              className={`ml-auto nav-link underline-from-center ${
                isScrolled ? "" : "navitem-scroll"
              }`}
            >
              Register
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <DarkModeToggle />
      </Navbar>
    );

    const userLink = (
      <Navbar
        bg={isDark ? "dark" : "light"}
        variant={isDark ? "dark" : "light"}
        fixed="top"
        collapseOnSelect
        className={isScrolled ? "navUnscrolled" : "navScrolled"}
        expand="md"
      >
        <Navbar.Brand>
          <Link to="/">
            {/* <img src={ImpactLogo} className="App-logo" alt="logo" style={{ width: '80px' }} /> */}
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="navbar-toggle x"
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </Navbar.Toggle>
        <Navbar.Collapse
          className="ml-auto justify-content-end"
          id="responsive-navbar-nav"
        >
          <Nav className="ml-auto">
            <NavLink
              // as={Link}
              exact
              activeClassName="active"
              to="/todos"
              // eventKey="5"
              className={`ml-auto nav-link underline-from-center ${
                isScrolled ? "" : "navitem-scroll"
              }`}
            >
              Todo List
            </NavLink>

            <NavLink
              // as={Link}
              exact
              activeClassName="active"
              to="/kanban"
              // eventKey="5"
              className={`ml-auto nav-link underline-from-center ${
                isScrolled ? "" : "navitem-scroll"
              }`}
            >
              Kanban
            </NavLink>

            <NavLink
              // as={Link}
              exact
              activeClassName="active"
              to="/calendar"
              // eventKey="5"
              className={`ml-auto nav-link underline-from-center ${
                isScrolled ? "" : "navitem-scroll"
              }`}
            >
              Calendar
            </NavLink>

            <NavDropdown
              // eventkey="4"
              title={
                <div style={{ display: "inline-block" }}>
                  <img src={image} alt="user" className="navbar-usericon" />
                </div>
              }
              id="basic-nav-dropdown"
            >
              {/* <NavDropdown.Item href={`/user/${loggedInUser}`}>
                My Profile
              </NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item href="" onClick={this.logOut}>
                Log Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <DarkModeToggle />
      </Navbar>
    );

    return <div>{loggedIn ? userLink : loginRegLink}</div>;
  }
}

export default withRouter(NavBar);
