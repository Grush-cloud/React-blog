import "../App.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <div className="sticky-footer">
      <Link to="/React-blog" className="home-link">
        All Blog Posts
      </Link>
    </div>
  );
}
