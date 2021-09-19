import { Link } from "react-router-dom";

export default function WeatherPredictor() {
  return (
    <div>
      <Link to="/predictor">
        <h1>Back</h1>
      </Link>
      <h1>Weather Predictor</h1>
    </div>
  );
}
