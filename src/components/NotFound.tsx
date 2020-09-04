import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export const NotFound = () => (
  <div className="not-found">
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - This page does not exist.</h2>
        </div>
        <Link to="/">Go TO Homepage</Link>
      </div>
    </div>
  </div>
);

export const Unauthorised = () => (
  <div className="not-found">
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404-unauth">
          <h1>Oops!</h1>
          <h2>403 - Access denied</h2>
        </div>
        <Link to="/signup">Sign Up</Link>

        <Link to="/">FAQ</Link>
      </div>
    </div>
  </div>
);
