import {
  useState,
  useEffect,
  useRef,
} from "react"

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

import ChatBubble from "../components/ChatBubble"
import TypingLoader from "../components/TypingLoader"

function Dashboard({
  logout,
}) {
  const [message, setMessage] =
    useState("")

  const [chat, setChat] =
    useState([])

  const [loading, setLoading] =
    useState(false)

  const [currentUser, setCurrentUser] =
    useState(null)

  const [activeTab, setActiveTab] =
    useState("workspace")

  const [selectedModel, setSelectedModel] =
    useState("GPT Core")

  const chatEndRef = useRef(null)

  // ANALYTICS

  const totalMessages =
    chat.length

  const totalUserMessages =
    chat.filter(
      (msg) =>
        msg.sender ===
        "user"
    ).length

  const totalAiMessages =
    chat.filter(
      (msg) =>
        msg.sender ===
        "ai"
    ).length

  // AUTH

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {
          setCurrentUser(user)
        }
      )

    return () => unsubscribe()
  }, [])

  // LOAD CHAT

  useEffect(() => {
    if (!currentUser?.uid)
      return

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
      onSnapshot(q, (snapshot) => {
        const loaded =
          snapshot.docs.map(
            (doc) =>
              doc.data()
          )

        setChat(loaded)
      })

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
      if (!currentUser?.uid)
        return

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
    }

  // SEND MESSAGE

  const sendMessage =
    async (
      customPrompt = null
    ) => {
      const finalMessage =
        customPrompt || message

      if (
        !finalMessage.trim() ||
        loading
      )
        return

      setActiveTab(
        "ai chat"
      )

      const userMessage = {
        sender: "user",
        text: finalMessage,
      }

      await saveMessage(
        userMessage
      )

      setMessage("")
      setLoading(true)

      let personalityPrompt = ""

      if (
        selectedModel ===
        "GPT Core"
      ) {
        personalityPrompt =
          "You are Aethrix AI created by Ashley Chua."
      }

      if (
        selectedModel ===
        "Jarvis X"
      ) {
        personalityPrompt =
          "You are Jarvis X, a futuristic AI created by Ashley Chua."
      }

      if (
        selectedModel ===
        "Vision AI"
      ) {
        personalityPrompt =
          "You are Vision AI focused on creativity and design."
      }

      if (
        selectedModel ===
        "Neural Pro"
      ) {
        personalityPrompt =
          "You are Neural Pro focused on coding and logic."
      }

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
                  `${personalityPrompt}\n\nUser: ${finalMessage}`,

                personality:
                  selectedModel,

                selectedModel:
                  selectedModel,
              }),
            }
          )

        const data =
          await response.json()

        const aiMessage = {
          sender: "ai",

          text:
            data.reply ||
            "No response.",
        }

        await saveMessage(
          aiMessage
        )
      } catch (error) {
        console.log(error)

        await saveMessage({
          sender: "ai",

          text:
            "Backend connection failed.",
        })
      }

      setLoading(false)
    }

  return (
    <div
      style={{
        minHeight:
          "100vh",

        background:
          "radial-gradient(circle at top, #0f172a 0%, #020617 70%)",

        color: "white",

        fontFamily:
          "'Space Grotesk', sans-serif",

        display: "flex",

        overflow: "hidden",
      }}
    >
      {/* SIDEBAR */}

      <div
        style={{
          width: "320px",

          padding: "28px",

          borderRight:
            "1px solid rgba(255,255,255,0.06)",

          background:
            "rgba(255,255,255,0.03)",

          backdropFilter:
            "blur(30px)",
        }}
      >
        <h1
          style={{
            fontSize:
              "54px",

            marginBottom:
              "40px",

            fontWeight:
              "800",

            background:
              "linear-gradient(to right,#60a5fa,#a78bfa)",

            WebkitBackgroundClip:
              "text",

            WebkitTextFillColor:
              "transparent",
          }}
        >
          Aethrix
        </h1>

        {[
          "workspace",
          "ai chat",
          "analytics",
          "memory",
          "images",
          "settings",
        ].map((item) => (
          <button
            key={item}
            onClick={() =>
              setActiveTab(
                item
              )
            }
            style={{
              width: "100%",

              padding:
                "18px",

              marginBottom:
                "16px",

              borderRadius:
                "22px",

              border:
                "1px solid rgba(255,255,255,0.06)",

              background:
                activeTab === item
                  ? "linear-gradient(to right,#2563eb,#7c3aed)"
                  : "rgba(255,255,255,0.03)",

              color:
                "white",

              fontSize:
                "16px",

              cursor:
                "pointer",

              textTransform:
                "capitalize",
            }}
          >
            {item}
          </button>
        ))}

        {/* CREATOR */}

        <div
          style={{
            marginTop:
              "40px",

            padding:
              "28px",

            borderRadius:
              "30px",

            background:
              "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))",
          }}
        >
          <h2
            style={{
              fontSize:
                "28px",

              marginBottom:
                "14px",
            }}
          >
            Ashley Chua
          </h2>

          <p
            style={{
              color:
                "#cbd5e1",

              lineHeight:
                1.8,

              fontSize:
                "15px",
            }}
          >
            Creator of Aethrix AI.
            Building futuristic AI
            systems and intelligent
            workspaces powered by
            Firebase and OpenAI.
          </p>
        </div>
      </div>

      {/* MAIN */}

      <div
        style={{
          flex: 1,

          padding: "34px",

          overflowY:
            "auto",
        }}
      >
        {/* TOPBAR */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            marginBottom:
              "36px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize:
                  "72px",

                margin: 0,

                fontWeight:
                  "900",

                background:
                  "linear-gradient(to right,#60a5fa,#c084fc)",

                WebkitBackgroundClip:
                  "text",

                WebkitTextFillColor:
                  "transparent",
              }}
            >
              Aethrix AI
            </h1>

            <p
              style={{
                color:
                  "#94a3b8",

                marginTop:
                  "10px",

                fontSize:
                  "18px",
              }}
            >
              Intelligent AI Workspace
            </p>
          </div>

          <button
            onClick={logout}
            style={{
              padding:
                "16px 28px",

              borderRadius:
                "18px",

              border: "none",

              background:
                "linear-gradient(to right,#2563eb,#7c3aed)",

              color:
                "white",

              fontWeight:
                "bold",

              cursor:
                "pointer",
            }}
          >
            Logout
          </button>
        </div>

        {/* WORKSPACE */}

        {activeTab ===
          "workspace" && (
          <>
            <div
              style={{
                padding:
                  "90px 70px",

                borderRadius:
                  "42px",

                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(59,130,246,0.08))",

                border:
                  "1px solid rgba(255,255,255,0.08)",

                textAlign:
                  "center",
              }}
            >
              <h1
                style={{
                  fontSize:
                    "110px",

                  marginBottom:
                    "18px",

                  fontWeight:
                    "900",

                  background:
                    "linear-gradient(to right,#60a5fa,#c084fc)",

                  WebkitBackgroundClip:
                    "text",

                  WebkitTextFillColor:
                    "transparent",
                }}
              >
                Aethrix AI
              </h1>

              <p
                style={{
                  fontSize:
                    "28px",

                  color:
                    "#94a3b8",

                  maxWidth:
                    "900px",

                  margin:
                    "0 auto",

                  lineHeight:
                    1.8,
                }}
              >
                Intelligent AI
                workspace designed
                for creators,
                developers,
                startups, and
                futuristic workflows.
              </p>
            </div>
          </>
        )}

        {/* AI CHAT */}

        {activeTab ===
          "ai chat" && (
          <div
            style={{
              height:
                "calc(100vh - 160px)",

              display: "flex",

              flexDirection:
                "column",
            }}
          >
            <div
              style={{
                flex: 1,

                overflowY:
                  "auto",

                padding:
                  "24px",

                borderRadius:
                  "32px",

                background:
                  "rgba(255,255,255,0.03)",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {chat.map(
                (
                  msg,
                  i
                ) => (
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
                display:
                  "flex",

                gap: "16px",

                marginTop:
                  "24px",
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
                placeholder={`Message ${selectedModel}...`}
                style={{
                  flex: 1,

                  padding:
                    "24px",

                  borderRadius:
                    "24px",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  background:
                    "rgba(255,255,255,0.04)",

                  color:
                    "white",

                  fontSize:
                    "18px",

                  outline:
                    "none",
                }}
              />

              <button
                onClick={() =>
                  sendMessage()
                }
                disabled={
                  loading
                }
                style={{
                  padding:
                    "24px 36px",

                  borderRadius:
                    "24px",

                  border:
                    "none",

                  background:
                    "linear-gradient(to right,#2563eb,#7c3aed)",

                  color:
                    "white",

                  fontWeight:
                    "bold",

                  cursor:
                    "pointer",

                  fontSize:
                    "18px",
                }}
              >
                {loading
                  ? "Thinking..."
                  : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard