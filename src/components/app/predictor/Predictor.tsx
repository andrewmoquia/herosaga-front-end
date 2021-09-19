import React from "react";
import { Link } from "react-router-dom";

export default function Predictor() {
  return (
    <nav>
      <ul>
        <Link to="/predictor/plant">
          <li>Plant Predictor</li>
        </Link>
        <Link to="/predictor/weather">
          <li>Weather Predictor</li>
        </Link>
      </ul>
    </nav>
  );
}
