import { Link } from "react-router-dom";

export default function PlantDictionary() {
  return (
    <div>
      <Link to="/dictionary">
        <h1>Back</h1>
      </Link>
      <h1>Plant Dictionary</h1>
    </div>
  );
}
