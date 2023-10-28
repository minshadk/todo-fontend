import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom"; 
import { useLogin } from "./../../hooks/useLogin";

export default function Login() {
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(userName, password);
      navigate("/home");
    } catch (error) {
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login </h2>
      <label>
        <span>username:</span>
        <input
          required
          type="username"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <button className="btn">Login</button>
      <div>
        <Link to="/signUp">don't have an account sign up</Link>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
