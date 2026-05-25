import { useState } from "react"

import {
  createUserWithEmailAndPassword,
} from "firebase/auth"

import {
  useNavigate,
} from "react-router-dom"

import { auth } from "../firebase"

function Signup() {
  const navigate = useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      alert(
        "Account created successfully 🚀"
      )

      navigate("/dashboard")
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background:
          "radial-gradient(circle at top, #1e3a8a 0%, #020617 70%)",

        color: "white",

        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          background:
            "rgba(255,255,255,0.08)",

          padding: "40px",

          borderRadius: "24px",

          width: "400px",
        }}
      >
        <h1>Create Account</h1>

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          style={{
            width: "100%",

            padding: "14px",

            marginTop: "20px",

            borderRadius: "12px",

            border: "none",
          }}
        />

        <input
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          type="password"
          placeholder="Password"
          style={{
            width: "100%",

            padding: "14px",

            marginTop: "20px",

            borderRadius: "12px",

            border: "none",
          }}
        />

        <button
          onClick={signup}
          style={{
            width: "100%",

            padding: "16px",

            marginTop: "20px",

            borderRadius: "14px",

            border: "none",

            background:
              "linear-gradient(to right, #3b82f6, #8b5cf6)",

            color: "white",

            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Signup