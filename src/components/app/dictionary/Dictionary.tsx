import { Link } from "react-router-dom";

export default function Dictionary() {
  return (
    <nav>
      <ul>
        <Link to="/dictionary/plant">
          <li>Plant Dictionary</li>
        </Link>
        <Link to="/dictionary/undead">
          <li>Undead Dictionary</li>
        </Link>
        <Link to="/dictionary/weather">
          <li>Weather Dictionary</li>
        </Link>
      </ul>
    </nav>
  );
}
