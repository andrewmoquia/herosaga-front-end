import { Link } from "react-router-dom";

export default function WeatherDictionary() {
  return (
    <div>
      <Link to="/dictionary">
        <h1>Back</h1>
      </Link>
      <h1>Weather Dictionary</h1>
    </div>
  );
}
