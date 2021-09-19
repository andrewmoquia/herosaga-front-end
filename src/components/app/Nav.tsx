import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <h1>Navigation</h1>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/predictor">
          <li>Predictor</li>
        </Link>
        <Link to="/dictionary">
          <li>Dictionary</li>
        </Link>
        <Link to="/credits">
          <li>Credits</li>
        </Link>
      </ul>
    </nav>
  );
}
