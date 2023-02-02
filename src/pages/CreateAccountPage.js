import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const CreateAccontPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Password and confirm Password do not match");
      }else{
        await createUserWithEmailAndPassword(getAuth(), email, password);
        navigate("/articles");
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div id="login-form">
      <h1> Create Account Page</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div id="login-button">
        <button onClick={createAccount}> Create Account </button>
        <Link to="/login"> Already have an account? Login in here</Link>
      </div>
    </div>
  );
};

export default CreateAccontPage;
