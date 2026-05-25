import {
  useEffect,
  useState,
} from "react"

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth"

import {
  auth,
} from "./firebase"

import Dashboard from "./pages/Dashboard"

import Login from "./pages/Login"

function App() {
  const [user,
    setUser] =
    useState(null)

  const [loading,
    setLoading] =
    useState(true)

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (
          currentUser
        ) => {
          setUser(
            currentUser
          )

          setLoading(
            false
          )
        }
      )

    return () =>
      unsubscribe()
  }, [])

  const logout =
    async () => {
      await signOut(auth)
    }

  if (loading) {
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
            "#020617",

          color:
            "white",

          fontFamily:
            "'Inter', sans-serif",
        }}
      >
        Loading Aethrix...
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <Dashboard
      user={user}
      logout={logout}
    />
  )
}

export default App