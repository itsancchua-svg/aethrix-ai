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
  doc,
  setDoc,
  getDoc,
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

  const [chatSessions, setChatSessions] =
    useState([])

  const [allChats, setAllChats] =
    useState({})

  const [currentChatId, setCurrentChatId] =
    useState(null)

  const chatEndRef =
    useRef(null)

  // SAVE CHAT SESSIONS

  const saveChatSessions =
    async (
      sessionsData
    ) => {
      if (
        !currentUser?.uid
      )
        return

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "chatSessions",
          "sessions"
        ),
        {
          sessions:
            sessionsData,
        }
      )
    }

  // SAVE ALL CHATS

  const saveAllChats =
    async (
      chatsData
    ) => {
      if (
        !currentUser?.uid
      )
        return

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "chatData",
          "messages"
        ),
        {
          chats:
            chatsData,
        }
      )
    }

  // CREATE NEW CHAT

    const createNewChat =
      async () => {
      const newChat = {
        id:
          Date.now().toString(),

        title:
          "New Conversation",
      }

      setChatSessions(
        (prev) => {
          const updated =
            [
              newChat,
              ...prev,
            ]

          saveChatSessions(
            updated
          )

          return updated
          }
          )
      setAllChats(
        (prev) => {
          const updated =
            {
              ...prev,

              [newChat.id]:
                [],
            }

          saveAllChats(
            updated
          )

          return updated
          }
          )
      setChat([])

      setActiveTab(
        "ai chat"
      )
      return newChat.id
    }

  // LIVE ANALYTICS

  const totalMessages =
    Object.values(
      allChats
    ).flat().length

  const totalUserMessages =
    Object.values(
      allChats
    )
      .flat()
      .filter(
        (msg) =>
          msg.sender ===
          "user"
      ).length

  const totalAiMessages =
    Object.values(
      allChats
    )
      .flat()
      .filter(
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
          setCurrentUser(
            user
          )
        }
      )

    return () =>
      unsubscribe()
  }, [])

  // LOAD SAVED SESSIONS + CHATS

 useEffect(() => {
  const loadSessions =
    async () => {
      if (
        !currentUser?.uid
      )
        return

      // LOAD CHAT SESSIONS

      const sessionsRef =
        doc(
          db,
          "users",
          currentUser.uid,
          "chatSessions",
          "sessions"
        )

      const sessionsSnap =
        await getDoc(
          sessionsRef
        )

      if (
        sessionsSnap.exists()
      ) {
        const data =
          sessionsSnap.data()

        if (
          data.sessions
        ) {
          setChatSessions(
            data.sessions
          )
          if (
  data.sessions.length > 0
) {
  setCurrentChatId(
    data.sessions[0].id
  )
}
        }
      }

      // LOAD ALL CHAT DATA

      const chatsRef =
        doc(
          db,
          "users",
          currentUser.uid,
          "chatData",
          "messages"
        )

      const chatsSnap =
        await getDoc(
          chatsRef
        )

      if (
        chatsSnap.exists()
      ) {
        const data =
          chatsSnap.data()

        if (
          data.chats
        ) {
          setAllChats(
            data.chats
          )
          if (
            currentChatId
         ) {
       setChat(
         data.chats[
             currentChatId
           ] || []
        )
      }
        }
      }
    }

  loadSessions()
}, [currentUser])
 
  // LOAD FIREBASE MESSAGES

  useEffect(() => {
    if (
      !currentUser?.uid
    )
      return

    const q = query(
      collection(
        db,
        "users",
        currentUser.uid,
        "messages"
      ),
      orderBy(
        "createdAt"
      )
    )

    const unsubscribe =
      onSnapshot(
        q,
        () => {}
      )

    return () =>
      unsubscribe()
  }, [currentUser])

  // AUTO SCROLL

  useEffect(() => {
    chatEndRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    )
  }, [chat])

  // SAVE MESSAGE

  // SEND MESSAGE

  const sendMessage =
    async (
      customPrompt =
        null
    ) => {
      const finalMessage =
        customPrompt ||
        message

      if (
        !finalMessage.trim() ||
        loading
      )
        return

      let activeChatId =
         currentChatId
  
      if (
          !activeChatId
     ) {
           activeChatId =
           createNewChat()
        }

      const userMessage =
        {
          sender:
            "user",

          text:
            finalMessage,
        }

      // AUTO TITLE

      setChatSessions(
        (prev) => {
          const updated =
            prev.map(
              (
                session
              ) =>
                session.id ===
                activeChatId
                  ? {
                      ...session,

                      title:
                        finalMessage.slice(
                          0,
                          28
                        ),
                    }
                  : session
            )

          saveChatSessions(
            updated
          )

          return updated
        }
      )

      setMessage("")
      setLoading(true)

      // TEMP UI UPDATE

      setChat(
        (prev) => [
          ...prev,
          userMessage,
        ]
      )

      let personalityPrompt =
        ""

      if (
        selectedModel ===
        "GPT Core"
      ) {
        personalityPrompt =
          "You are Aethrix AI, a balanced and intelligent AI assistant created by Ashley Chua."
      }

      if (
        selectedModel ===
        "Jarvis X"
      ) {
        personalityPrompt =
          "You are Jarvis X, a futuristic AI assistant created by Ashley Chua."
      }

      if (
        selectedModel ===
        "Vision AI"
      ) {
        personalityPrompt =
          "You are Vision AI, a creative AI assistant created by Ashley Chua."
      }

      if (
        selectedModel ===
        "Neural Pro"
      ) {
        personalityPrompt =
          "You are Neural Pro, an advanced analytical AI created by Ashley Chua."
      }

      try {
        const response =
          await fetch(
            "https://aethrix-ai.onrender.com/chat",
            {
              method:
                "POST",

              headers:
                {
                  "Content-Type":
                    "application/json",
                },

              body:
                JSON.stringify(
                  {
                    message: `${personalityPrompt}\n\nUser: ${finalMessage}`,

                    personality:
                      selectedModel,

                    selectedModel:
                      selectedModel,
                  }
                ),
            }
          )

        const data =
          await response.json()

        const aiMessage =
          {
            sender:
              "ai",

            text:
              data.reply ||
              "No response.",
          }

        const updatedChat =
          [
            ...(allChats[
              activeChatId
            ] || []),

            userMessage,

            aiMessage,
          ]

        // UPDATE UI

        setChat(
          updatedChat
        )

        // UPDATE ALL CHATS

        setAllChats(
          (prev) => {
            const updated =
              {
                ...prev,

                [activeChatId]:
                  updatedChat,
              }

            saveAllChats(
              updated
            )

            return updated
          }
        )

       
      } catch (error) {
        console.log(
          error
        )

        const errorMessage =
          {
            sender:
              "ai",

            text:
              "Backend connection failed.",
          }

        setChat(
          (prev) => [
            ...prev,
            errorMessage,
          ]
        )
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

        color:
          "white",

        fontFamily:
          "'Space Grotesk', sans-serif",

        display:
          "flex",

        overflow:
          "hidden",
      }}
    >
      {/* SIDEBAR */}

      <div
        style={{
          width:
            "320px",

          padding:
            "28px",

          borderRight:
            "1px solid rgba(255,255,255,0.06)",

          background:
            "rgba(255,255,255,0.03)",

          backdropFilter:
            "blur(30px)",

          overflowY:
            "auto",
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

        {/* NAVIGATION */}

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
              width:
                "100%",

              padding:
                "18px",

              marginBottom:
                "16px",

              borderRadius:
                "22px",

              border:
                "1px solid rgba(255,255,255,0.06)",

              background:
                activeTab ===
                item
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

        {/* NEW CHAT */}

        <button
          onClick={
            createNewChat
          }
          style={{
            width:
              "100%",

            padding:
              "18px",

            marginTop:
              "10px",

            marginBottom:
              "24px",

            borderRadius:
              "22px",

            border:
              "none",

            background:
              "linear-gradient(to right,#2563eb,#7c3aed)",

            color:
              "white",

            fontWeight:
              "bold",

            fontSize:
              "16px",

            cursor:
              "pointer",
          }}
        >
          + New Chat
        </button>

        {/* CHAT HISTORY */}

        <div
          style={{
            marginBottom:
              "24px",

            display:
              "flex",

            flexDirection:
              "column",

            gap: "12px",
          }}
        >
          {chatSessions.map(
            (
              session
            ) => (
              <button
                key={
                  session.id
                }
                onClick={() => {
                  setCurrentChatId(
                    session.id
                  )

                  setChat(
                    allChats[
                      session.id
                    ] || []
                  )

                  setActiveTab(
                    "ai chat"
                  )
                }}
                style={{
                  padding:
                    "16px",

                  borderRadius:
                    "18px",

                  border:
                    currentChatId ===
                    session.id
                      ? "1px solid #60a5fa"
                      : "1px solid rgba(255,255,255,0.06)",

                  background:
                    currentChatId ===
                    session.id
                      ? "rgba(59,130,246,0.18)"
                      : "rgba(255,255,255,0.03)",

                  color:
                    "white",

                  cursor:
                    "pointer",

                  textAlign:
                    "left",

                  fontSize:
                    "14px",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "center",
                  }}
                >
                  <span>
                    {
                      session.title
                    }
                  </span>

                  <span
                    onClick={(
                      e
                    ) => {
                      e.stopPropagation()

                      setChatSessions(
                        (
                          prev
                        ) => {
                          const updated =
                            prev.filter(
                              (
                                chat
                              ) =>
                                chat.id !==
                                session.id
                            )

                          saveChatSessions(
                            updated
                          )

                          return updated
                        }
                      )

                      setAllChats(
                        (
                          prev
                        ) => {
                          const updated =
                            {
                              ...prev,
                            }

                          delete updated[
                            session.id
                          ]

                          saveAllChats(
                            updated
                          )

                          return updated
                        }
                      )

                      if (
                        currentChatId ===
                        session.id
                      ) {
                        setCurrentChatId(
                          null
                        )

                        setChat(
                          []
                        )
                      }
                    }}
                    style={{
                      color:
                        "#ef4444",

                      cursor:
                        "pointer",

                      fontWeight:
                        "bold",

                      marginLeft:
                        "10px",
                    }}
                  >
                    ×
                  </span>
                </div>
              </button>
            )
          )}
        </div>

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
            Creator of
            Aethrix AI.
            Building
            futuristic AI
            systems and
            intelligent
            workspaces
            powered by
            Firebase and
            OpenAI.
          </p>
        </div>
      </div>

      {/* MAIN */}

      <div
        style={{
          flex: 1,

          padding:
            "34px",

          overflowY:
            "auto",
        }}
      >
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

        {/* ANALYTICS */}

        {activeTab ===
          "analytics" && (
          <div>
            <h1
              style={{
                fontSize:
                  "64px",

                marginBottom:
                  "30px",
              }}
            >
              Analytics
            </h1>

            <div
              style={{
                display:
                  "grid",

                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",

                gap: "24px",
              }}
            >
              {[
                {
                  title:
                    "Total Messages",

                  value:
                    totalMessages,
                },

                {
                  title:
                    "User Messages",

                  value:
                    totalUserMessages,
                },

                {
                  title:
                    "AI Responses",

                  value:
                    totalAiMessages,
                },

                {
                  title:
                    "Active Model",

                  value:
                    selectedModel,
                },
              ].map((item) => (
                <div
                  key={
                    item.title
                  }
                  style={{
                    padding:
                      "40px",

                    borderRadius:
                      "30px",

                    background:
                      "rgba(255,255,255,0.04)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p
                    style={{
                      color:
                        "#94a3b8",

                      marginBottom:
                        "12px",
                    }}
                  >
                    {
                      item.title
                    }
                  </p>

                  <h1
                    style={{
                      fontSize:
                        "52px",

                      margin: 0,
                    }}
                  >
                    {
                      item.value
                    }
                  </h1>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MEMORY */}

        {activeTab ===
          "memory" && (
          <div>
            <h1
              style={{
                fontSize:
                  "64px",

                marginBottom:
                  "30px",
              }}
            >
              Memory
            </h1>

            <div
              style={{
                display:
                  "flex",

                flexDirection:
                  "column",

                gap: "20px",
              }}
            >
              {chat.length ===
              0 ? (
                <div
                  style={{
                    padding:
                      "40px",

                    borderRadius:
                      "30px",

                    background:
                      "rgba(255,255,255,0.04)",

                    border:
                      "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h2>
                    No Memories Yet
                  </h2>

                  <p
                    style={{
                      color:
                        "#94a3b8",
                    }}
                  >
                    Your AI memory
                    archive will
                    appear here after
                    chatting.
                  </p>
                </div>
              ) : (
                [...chat]
                  .reverse()
                  .slice(0, 10)
                  .map(
                    (
                      msg,
                      i
                    ) => (
                      <div
                        key={i}
                        style={{
                          padding:
                            "30px",

                          borderRadius:
                            "30px",

                          background:
                            "rgba(255,255,255,0.04)",

                          border:
                            "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <h2>
                          {msg.sender ===
                          "user"
                            ? "User Memory"
                            : "AI Response"}
                        </h2>

                        <p
                          style={{
                            color:
                              "#cbd5e1",

                            lineHeight:
                              1.8,
                          }}
                        >
                          {
                            msg.text
                          }
                        </p>
                      </div>
                    )
                  )
              )}
            </div>
          </div>
        )}

        {/* SETTINGS */}

        {activeTab ===
          "settings" && (
          <div>
            <h1
              style={{
                fontSize:
                  "64px",

                marginBottom:
                  "30px",
              }}
            >
              Settings
            </h1>

            <div
              style={{
                display:
                  "flex",

                gap: "18px",

                flexWrap:
                  "wrap",
              }}
            >
              {[
                "GPT Core",
                "Jarvis X",
                "Vision AI",
                "Neural Pro",
              ].map((model) => (
                <button
                  key={model}
                  onClick={() =>
                    setSelectedModel(
                      model
                    )
                  }
                  style={{
                    padding:
                      "18px 28px",

                    borderRadius:
                      "22px",

                    border:
                      selectedModel ===
                      model
                        ? "1px solid #60a5fa"
                        : "1px solid rgba(255,255,255,0.08)",

                    background:
                      selectedModel ===
                      model
                        ? "linear-gradient(to right,#2563eb,#7c3aed)"
                        : "rgba(255,255,255,0.04)",

                    color:
                      "white",

                    cursor:
                      "pointer",
                  }}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI CHAT */}

        {activeTab ===
          "ai chat" && (
          <div
            style={{
              height:
                "calc(100vh - 160px)",

              display:
                "flex",

              flexDirection:
                "column",
            }}
          >
            <div
              style={{
                marginBottom:
                  "18px",

                display:
                  "flex",

                justifyContent:
                  "space-between",

                alignItems:
                  "center",

                padding:
                  "18px 24px",

                borderRadius:
                  "24px",

                background:
                  "rgba(255,255,255,0.04)",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div>
                <p
                  style={{
                    color:
                      "#94a3b8",

                    marginBottom:
                      "6px",

                    fontSize:
                      "14px",
                  }}
                >
                  ACTIVE MODEL
                </p>

                <h2
                  style={{
                    fontSize:
                      "28px",

                    margin: 0,
                  }}
                >
                  {
                    selectedModel
                  }
                </h2>
              </div>

              <div
                style={{
                  display:
                    "flex",

                  alignItems:
                    "center",

                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width:
                      "12px",

                    height:
                      "12px",

                    borderRadius:
                      "50%",

                    background:
                      "#22c55e",

                    boxShadow:
                      "0 0 18px #22c55e",
                  }}
                />

                <span>
                  Online
                </span>
              </div>
            </div>

            {/* CHAT AREA */}

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

            {/* INPUT */}

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
                onChange={(
                  e
                ) =>
                  setMessage(
                    e.target
                      .value
                  )
                }
                onKeyDown={(
                  e
                ) => {
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