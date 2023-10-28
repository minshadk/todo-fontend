import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

export default function SignUp() {
  const { signup, error, isLoading } = useSignup();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(userName, password);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>SignUp </h2>
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

      <button className="btn">SignUp</button>
      <div>
        <Link to="/"> have an account login</Link>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
