import {
  useState,
} from "react"

import {
  signInWithEmailAndPassword,
} from "firebase/auth"

import {
  auth,
} from "../firebase"

function Login() {
  const [email,
    setEmail] =
    useState("")

  const [password,
    setPassword] =
    useState("")

  const [loading,
    setLoading] =
    useState(false)

  const handleLogin =
    async () => {
      if (
        !email ||
        !password
      ) {
        alert(
          "Please fill all fields."
        )

        return
      }

      try {
        setLoading(true)

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

      } catch (error) {
        console.log(error)

        alert(
          error.message
        )
      }

      setLoading(false)
    }

  return (
    <div
      style={{
        minHeight:
          "100vh",

        display:
          "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        background:
          "radial-gradient(circle at top, #1e3a8a 0%, #020617 70%)",

        color:
          "white",

        fontFamily:
          "'Inter', sans-serif",

        padding:
          "20px",
      }}
    >
      <div
        style={{
          background:
            "rgba(255,255,255,0.08)",

          padding:
            "40px",

          borderRadius:
            "28px",

          width:
            "100%",

          maxWidth:
            "420px",

          backdropFilter:
            "blur(20px)",

          border:
            "1px solid rgba(255,255,255,0.06)",

          boxShadow:
            "0 20px 60px rgba(0,0,0,0.35)",
        }}
      >
        <h1
          style={{
            marginTop: 0,

            marginBottom:
              "12px",

            fontSize:
              "42px",

            fontWeight:
              "800",

            letterSpacing:
              "-2px",
          }}
        >
          Aethrix AI
        </h1>

        <p
          style={{
            color:
              "#94a3b8",

            marginBottom:
              "28px",

            lineHeight:
              "1.7",
          }}
        >
          Welcome back.
          Access your AI workspace.
        </p>

        <input
          value={email}
          onChange={(
            e
          ) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="Email"
          style={{
            width:
              "100%",

            padding:
              "16px",

            marginTop:
              "14px",

            borderRadius:
              "16px",

            border:
              "1px solid rgba(255,255,255,0.06)",

            background:
              "rgba(255,255,255,0.04)",

            color:
              "white",

            outline:
              "none",

            fontSize:
              "15px",

            boxSizing:
              "border-box",
          }}
        />

        <input
          type="password"
          value={password}
          onChange={(
            e
          ) =>
            setPassword(
              e.target.value
            )
          }
          placeholder="Password"
          style={{
            width:
              "100%",

            padding:
              "16px",

            marginTop:
              "18px",

            borderRadius:
              "16px",

            border:
              "1px solid rgba(255,255,255,0.06)",

            background:
              "rgba(255,255,255,0.04)",

            color:
              "white",

            outline:
              "none",

            fontSize:
              "15px",

            boxSizing:
              "border-box",
          }}
        />

        <button
          onClick={
            handleLogin
          }
          disabled={
            loading
          }
          style={{
            width:
              "100%",

            padding:
              "16px",

            marginTop:
              "24px",

            borderRadius:
              "18px",

            border:
              "none",

            background:
              "linear-gradient(to right, #2563eb, #4f46e5)",

            color:
              "white",

            cursor:
              "pointer",

            fontWeight:
              "700",

            fontSize:
              "15px",

            boxShadow:
              "0 10px 30px rgba(37,99,235,0.25)",

            transition:
              "0.25s ease",
          }}
        >
          {loading
            ? "Signing in..."
            : "Login"}
        </button>
      </div>
    </div>
  )
}

export default Login