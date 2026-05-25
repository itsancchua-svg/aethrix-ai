import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Aethrix AI</h2>

      <input placeholder="Email" style={styles.input} />
      <input placeholder="Password" type="password" style={styles.input} />

      <button
        style={styles.button}
        onClick={() => navigate("/")}
      >
        Login
      </button>

      <button style={styles.buttonAlt}>Sign Up</button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0b1020",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    color: "white",
  },
  input: {
    padding: 10,
    width: 250,
    borderRadius: 6,
    border: "none",
  },
  button: {
    padding: 10,
    width: 260,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 6,
  },
  buttonAlt: {
    padding: 10,
    width: 260,
    background: "#1f2937",
    color: "white",
    border: "none",
    borderRadius: 6,
  },
};