import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import MyTodos from "./components/MyTodos";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState<Boolean>(false);

  useEffect(() => {
    fetch("/checkToken").then(
      ({ status }) => status === 200 && setLoggedIn(true)
    );
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

  return (
    <Router>
      <div className="App">
        {/* <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
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
