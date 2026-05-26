import {
  useState,
} from "react"

import {
  createUserWithEmailAndPassword,
} from "firebase/auth"

import {
  auth,
} from "../firebase"

import {
  useNavigate,
} from "react-router-dom"

function Signup() {
  const navigate =
    useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [error, setError] =
    useState("")

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      navigate("/dashboard")
    } catch (err) {
      setError(
        err.message
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
          Create Account
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
          onClick={signup}
          style={styles.button}
        >
          Sign Up
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

export default Signup