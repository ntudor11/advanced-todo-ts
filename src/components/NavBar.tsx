import React, { Component, useEffect } from "react";
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
    const { isScrolled, loggedInUser, image } = this.state;
    const { loggedIn, isDark } = this.props;

    console.log(isDark);

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
              // eventkey="4"
              activeClassName="active"
              to="/login"
              className={`ml-auto nav-link underline-from-center ${
                isScrolled ? "" : "navitem-scroll"
              }`}
            >
              Login
            </NavLink>

            <NavLink
              // as={Link}
              exact
              activeClassName="active"
              to="/signup"
              // eventkey="5"
              className={`ml-auto nav-link underline-from-center ${
                isScrolled ? "" : "navitem-scroll"
              }`}
            >
              Sign Up
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
              // eventkey="5"
              className={`ml-auto nav-link underline-from-center ${
                isScrolled ? "" : "navitem-scroll"
              }`}
            >
              Todos
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
              <NavDropdown.Item href={`/user/${loggedInUser}`}>
                My Profile
              </NavDropdown.Item>
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
