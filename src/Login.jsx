import {
  useState,
} from "react"

import {
  signInWithEmailAndPassword,
} from "firebase/auth"

import {
  auth,
} from "../firebase"

import {
  useNavigate,
} from "react-router-dom"

function Login() {
  const navigate =
    useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [error, setError] =
    useState("")

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      navigate("/dashboard")
    } catch (err) {
      setError(
        "Invalid credentials."
      )
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "#020617",

        display: "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        color: "white",
      }}
    >
      <div
        style={{
          width: "380px",

          padding: "40px",

          borderRadius:
            "28px",

          background:
            "rgba(255,255,255,0.05)",

          backdropFilter:
            "blur(18px)",
        }}
      >
        <h1>
          Welcome Back
        </h1>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={styles.input}
        />

        {error && (
          <p
            style={{
              color:
                "#f87171",
            }}
          >
            {error}
          </p>
        )}

        <button
          onClick={login}
          style={styles.button}
        >
          Login
        </button>
      </div>
    </div>
  )
}

const styles = {
  input: {
    width: "100%",

    padding: "16px",

    marginTop: "16px",

    borderRadius:
      "16px",

    border: "none",

    background:
      "rgba(255,255,255,0.06)",

    color: "white",
  },

  button: {
    width: "100%",

    marginTop: "20px",

    padding: "16px",

    borderRadius:
      "18px",

    border: "none",

    background:
      "linear-gradient(to right, #2563eb, #4f46e5)",

    color: "white",

    fontWeight: "600",

    cursor: "pointer",
  },
}

export default Login