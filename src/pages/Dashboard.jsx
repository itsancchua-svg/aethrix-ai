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

function Dashboard({ user, logout }) {
  const [message, setMessage] =
    useState("")

  const [chat, setChat] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  const chatEndRef = useRef(null)

  useEffect(() => {
    if (!auth.currentUser) return

    const q = query(
      collection(
        db,
        "users",
        auth.currentUser.uid,
        "messages"
      ),
      orderBy("createdAt")
    )

    const unsubscribe =
      onSnapshot(q, (snapshot) => {
        const loaded =
          snapshot.docs.map(
            (doc) => doc.data()
          )

        setChat(loaded)
      })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [chat])

  const saveMessage =
    async (msg) => {
      if (!auth.currentUser)
        return

      await addDoc(
        collection(
          db,
          "users",
          auth.currentUser.uid,
          "messages"
        ),
        {
          ...msg,
          createdAt: Date.now(),
        }
      )
    }

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

      try {
        const response =
          await fetch(
            "http://localhost:3001/chat",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                message:
                  currentMessage,

                personality:
                  "Jarvis",

                selectedModel:
                  "GPT Core",
              }),
            }
          )

        const reader =
          response.body.getReader()

        const decoder =
          new TextDecoder()

        let aiText = ""

        while (true) {
          const {
            done,
            value,
          } =
            await reader.read()

          if (done) break

          const chunk =
            decoder.decode(value)

          aiText += chunk
        }

        const aiMessage = {
          sender: "ai",
          text: aiText,
        }

        await saveMessage(
          aiMessage
        )
      } catch (error) {
        console.log(error)

        await saveMessage({
          sender: "ai",
          text:
            "Memory system failed.",
        })
      }

      setLoading(false)
    }

  return (
    <div>
      <FloatingOrb />

      <div
        style={{
          minHeight: "100vh",

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
            user={user}
            logout={logout}
          />

          <div
            style={{
              flex: 1,

              overflowY: "auto",

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