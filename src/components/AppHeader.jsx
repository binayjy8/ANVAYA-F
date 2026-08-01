import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "./AppHeader.css";

export default function AppHeader() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="app-header">
      <span className="app-header__brand">Anvaya</span>
      <div className="app-header__right">
        {username && <span className="app-header__user">{username}</span>}
        <button className="app-header__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}