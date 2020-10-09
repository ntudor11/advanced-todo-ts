import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import Register from "./components/Register";
import MyTodosContainer from "./views/MyTodosContainer";
import NavBar from "./components/NavBar";
import KanbanContainer from "./views/KanbanContainer";
import DashboardContainer from "./views/DashboardContainer";
import CalendarContainer from "./views/CalendarContainer";
import { NotFound, Unauthorised } from "./components/NotFound";

import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles.scss";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/checkToken").then(
      ({ status }) => status === 200 && setLoggedIn(true)
    );
  }, []);

  const PrivateRoute: any = ({ comp: Component, ...rest }: { comp: any }) => (
    <Route
      {...rest}
      render={(props) =>
        loggedIn === true ? <Component {...props} /> : <Unauthorised />
      }
    />
  );

  return (
    <Router>
      <div className="App">
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <PrivateRoute exact path="/todos" comp={MyTodosContainer} />

          <PrivateRoute exact path="/kanban" comp={KanbanContainer} />

          <PrivateRoute exact path="/calendar" comp={CalendarContainer} />

          <PrivateRoute exact path="/dashboard" comp={DashboardContainer} />

          {loggedIn === true ? (
            <Route
              exact
              path="/"
              render={(props: any) => <MyTodosContainer {...props} />}
            />
          ) : (
            <Route
              exact
              path={["/", "/login"]}
              render={(props: any) => (
                <Login
                  {...props}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              )}
            />
          )}

          {loggedIn !== true && (
            <Route exact path="/register" component={Register} />
          )}

          <Route exact render={(props: any) => <NotFound {...props} />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
