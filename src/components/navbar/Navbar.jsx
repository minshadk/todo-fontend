import { Link } from "react-router-dom";

import "./Navbar.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="navbar">
      <ul>
        <li className="logo">
         <h1>Todos</h1>
        </li>
        {user && (
          <li>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}
