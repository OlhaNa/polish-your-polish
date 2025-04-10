import { Link, useLocation } from "react-router-dom";

const HomeButton = () => {
  const location = useLocation();

  if (location.pathname === "/") return null;
  return (
    <Link
      to="/"
      className="position-absolute"
      style={{ top: "1rem", right: "1rem" }}
    >
      Back to home
    </Link>
  );
};

export default HomeButton;
