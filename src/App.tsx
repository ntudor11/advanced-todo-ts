import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import MyTodos from "./components/MyTodos";
import NavBar from "./components/NavBar";
import { NotFound, Unauthorised } from "./components/NotFound";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    fetch("/checkToken").then(
      ({ status }) => status === 200 && setLoggedIn(true)
    );
  }, []);

  useEffect(() => {
    console.log(document.body.classList);
    if (document.body.classList.contains("dark-mode")) {
      setDark(true);
      console.log(true);
    }
  }, []);

  const PrivateRoute: any = ({ comp: MyComponent, ...rest }: { comp: any }) => (
    <Route
      {...rest}
      render={(props: any) =>
        loggedIn === true ? (
          <MyComponent {...props} />
        ) : (
          <Login {...props} setLoggedIn={setLoggedIn} />
        )
      }
    />
  );

  // const PrivateRoute: any = ({ comp: Component, ...rest }: { comp: any }) => (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       loggedIn === true ? <Component {...props} /> : <Unauthorised />
  //     }
  //   />
  // );

  return (
    <Router>
      <div className="App">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} isDark={isDark} />
        <Switch>
          <PrivateRoute exact path="/" comp={MyTodos} />
          {/* <Route
            exact
            path="/login"
            render={(props: any) => (
              <Login {...props} setLoggedIn={setLoggedIn} />
            )}
          /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
