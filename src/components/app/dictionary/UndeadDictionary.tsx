import { Link } from "react-router-dom";

export default function UndeadDictionary() {
  return (
    <div>
      <Link to="/dictionary">
        <h1>Back</h1>
      </Link>
      <h1>Undead Dictionary</h1>
    </div>
  );
}
