import {
  useState,
  useEffect,
  useRef,
} from "react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import FloatingOrb from "../components/FloatingOrb"

import ChatBubble from "../components/ChatBubble"
import TypingLoader from "../components/TypingLoader"

import {
  auth,
  db,
} from "../firebase"

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore"

import {
  onAuthStateChanged,
} from "firebase/auth"

function Dashboard({ logout }) {
  const [message, setMessage] =
    useState("")

  const [chat, setChat] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  const [currentUser, setCurrentUser] =
    useState(null)

  const chatEndRef = useRef(null)

  // AUTH LISTENER
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          console.log(
            "AUTH USER:",
            user
          )

          setCurrentUser(user)
        }
      )

    return () => unsubscribe()
  }, [])

  // LOAD CHAT
  useEffect(() => {
    if (!currentUser?.uid)
      return

    console.log(
      "LOADING FIRESTORE..."
    )

    const q = query(
      collection(
        db,
        "users",
        currentUser.uid,
        "messages"
      ),
      orderBy("createdAt")
    )

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {
          const loaded =
            snapshot.docs.map(
              (doc) =>
                doc.data()
            )

          console.log(
            "MESSAGES:",
            loaded
          )

          setChat(loaded)
        },
        (error) => {
          console.log(
            "FIRESTORE ERROR:",
            error
          )
        }
      )

    return () => unsubscribe()
  }, [currentUser])

  // AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [chat])

  // SAVE MESSAGE
  const saveMessage =
    async (msg) => {
      try {
        if (!currentUser?.uid) {
          console.log(
            "NO USER FOUND"
          )
          return
        }

        console.log(
          "SAVING MESSAGE..."
        )

        await addDoc(
          collection(
            db,
            "users",
            currentUser.uid,
            "messages"
          ),
          {
            ...msg,
            createdAt:
              Date.now(),
          }
        )

        console.log(
          "MESSAGE SAVED"
        )
      } catch (error) {
        console.log(
          "SAVE ERROR:",
          error
        )
      }
    }

  // SEND MESSAGE
  const sendMessage =
    async () => {
      if (
        !message.trim() ||
        loading
      )
        return

      const currentMessage =
        message

      const userMessage = {
        sender: "user",
        text: currentMessage,
      }

      await saveMessage(
        userMessage
      )

      setMessage("")
      setLoading(true)

      // FIRESTORE TEST
      setTimeout(async () => {
        const aiMessage = {
          sender: "ai",
          text:
            "Firestore memory test successful.",
        }

        await saveMessage(
          aiMessage
        )

        setLoading(false)
      }, 1000)
    }

  return (
    <div>
      <FloatingOrb />

      <div
        style={{
          minHeight:
            "100vh",

          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 100%)",

          color: "white",

          fontFamily:
            "Inter, sans-serif",

          display: "flex",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,

            display: "flex",

            flexDirection:
              "column",

            height: "100vh",
          }}
        >
          <Navbar
            user={currentUser}
            logout={logout}
          />

          <div
            style={{
              flex: 1,

              overflowY:
                "auto",

              padding:
                "40px 80px",

              display: "flex",

              flexDirection:
                "column",
            }}
          >
            {chat.length ===
              0 && (
              <div
                style={{
                  marginTop:
                    "100px",

                  textAlign:
                    "center",
                }}
              >
                <h1
                  style={{
                    fontSize:
                      "64px",
                  }}
                >
                  Aethrix AI
                </h1>

                <p
                  style={{
                    color:
                      "#94a3b8",
                  }}
                >
                  Persistent AI
                  workspace
                </p>
              </div>
            )}

            {chat.map(
              (msg, i) => (
                <ChatBubble
                  key={i}
                  sender={
                    msg.sender
                  }
                  text={
                    msg.text
                  }
                />
              )
            )}

            {loading && (
              <TypingLoader />
            )}

            <div
              ref={
                chatEndRef
              }
            />
          </div>

          <div
            style={{
              padding:
                "24px 40px",

              borderTop:
                "1px solid rgba(255,255,255,0.08)",

              background:
                "rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                maxWidth:
                  "1000px",

                margin:
                  "0 auto",

                display:
                  "flex",

                gap: "16px",
              }}
            >
              <input
                id="message-input"
                name="message"
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                      "Enter" &&
                    !loading
                  ) {
                    sendMessage()
                  }
                }}
                placeholder="Message Aethrix..."
                style={{
                  flex: 1,

                  padding:
                    "20px",

                  borderRadius:
                    "24px",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  background:
                    "rgba(255,255,255,0.05)",

                  color:
                    "white",

                  outline:
                    "none",

                  fontSize:
                    "15px",
                }}
              />

              <button
                onClick={
                  sendMessage
                }
                disabled={
                  loading
                }
                style={{
                  padding:
                    "18px 28px",

                  borderRadius:
                    "22px",

                  border:
                    "none",

                  background:
                    "linear-gradient(to right, #2563eb, #4f46e5)",

                  color:
                    "white",

                  cursor:
                    loading
                      ? "not-allowed"
                      : "pointer",

                  fontWeight:
                    "600",
                }}
              >
                {loading
                  ? "Thinking..."
                  : "Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard