import {
  useState,
  useEffect,
  useRef,
} from "react"

import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import HeroSection from "../components/HeroSection"
import FeaturesSection from "../components/FeaturesSection"
import TestimonialsSection from "../components/TestimonialsSection"
import Footer from "../components/Footer"
import FloatingOrb from "../components/FloatingOrb"
import SectionFade from "../components/SectionFade"

import FileUploader from "../components/FileUploader"
import MemoryPanel from "../components/MemoryPanel"
import WorkspaceCard from "../components/WorkspaceCard"
import ModelSelector from "../components/ModelSelector"
import PersonalitySelector from "../components/PersonalitySelector"
import StatsCards from "../components/StatsCards"
import AnalyticsPanel from "../components/AnalyticsPanel"
import AIStatus from "../components/AIStatus"
import VoiceInput from "../components/VoiceInput"
import TypingLoader from "../components/TypingLoader"
import ChatBubble from "../components/ChatBubble"
import QuickActions from "../components/QuickActions"
import ThemeSwitcher from "../components/ThemeSwitcher"
import TaskPanel from "../components/TaskPanel"
import ExportChat from "../components/ExportChat"
import ImageGallery from "../components/ImageGallery"

function Dashboard({ user, logout }) {
  const [activeTab, setActiveTab] = useState("AI Chat")
  const [selectedModel, setSelectedModel] = useState("GPT Core")
  const [personality, setPersonality] = useState("Jarvis")

  const [message, setMessage] = useState("")
  const [chat, setChat] = useState([])

  const [imageGallery, setImageGallery] = useState([])
  const [imageCount, setImageCount] = useState(0)

  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)

  const [theme, setTheme] = useState({
    name: "Galaxy",
    bg: "#020617",
  })

  const chatEndRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [chat, isTyping])

  const sendMessage = async () => {
    if (!message.trim() || loading) return

    const currentMessage = message

    const userMessage = {
      sender: "user",
      text: currentMessage,
    }

    setChat((prev) => [...prev, userMessage])

    setMessage("")
    setIsTyping(true)
    setLoading(true)

    try {
      const response = await fetch(
        "http://localhost:3001/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: currentMessage,
            personality,
            selectedModel,
          }),
        }
      )

      const data = await response.json()

      const aiMessage = {
        sender: "ai",
        text: data.reply || "No reply received.",
      }

      setTimeout(() => {
        setChat((prev) => [...prev, aiMessage])
      }, 500)
    } catch (error) {
      console.log(error)

      const errorMessage = {
        sender: "ai",
        text: "Backend connection failed.",
      }

      setChat((prev) => [...prev, errorMessage])
    }

    setIsTyping(false)
    setLoading(false)
  }

  return (
    <div>
      <FloatingOrb />

      <div
        style={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${theme.bg} 0%, #0f172a 100%)`,
          color: "white",
          fontFamily: "Inter, sans-serif",
          padding: "20px",
        }}
      >
        <Navbar user={user} logout={logout} />

        <div style={{ display: "flex", gap: "20px" }}>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div style={{ flex: 1 }}>
            <SectionFade>
              <HeroSection />
            </SectionFade>

            <SectionFade>
              <FeaturesSection />
            </SectionFade>

            <SectionFade>
              <TestimonialsSection />
            </SectionFade>

            <div id="chat-section">
              <AIStatus
                selectedModel={selectedModel}
                activeTab={activeTab}
              />

              <ThemeSwitcher theme={theme} setTheme={setTheme} />

              <WorkspaceCard
                title={activeTab}
                description={`Running on ${selectedModel}`}
              />

              <StatsCards
                chatCount={chat.length}
                imageCount={imageCount}
                activeWorkspace={activeTab}
              />

              <AnalyticsPanel
                chatCount={chat.length}
                imageCount={imageCount}
              />

              <ModelSelector
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />

              <PersonalitySelector
                personality={personality}
                setPersonality={setPersonality}
              />

              <QuickActions setMessage={setMessage} />

              <TaskPanel />
              <FileUploader />
              <MemoryPanel chat={chat} />
              <ExportChat chat={chat} />

              <div style={{ minHeight: "400px" }}>
                {chat.map((msg, i) => (
                  <ChatBubble
                    key={i}
                    sender={msg.sender}
                    text={msg.text}
                  />
                ))}

                {isTyping && <TypingLoader />}

                <div ref={chatEndRef} />
              </div>

              {/* INPUT AREA */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "16px",
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      sendMessage()
                    }
                  }}
                  placeholder="Message Aethrix..."
                  style={{
                    flex: 1,
                    padding: "18px",
                    borderRadius: "18px",
                    border: "none",
                    background: "rgba(255,255,255,0.03)",
                    color: "white",
                    outline: "none",
                  }}
                />

                <VoiceInput setMessage={setMessage} />

                <button
                  onClick={sendMessage}
                  disabled={loading}
                  style={{
                    padding: "16px 24px",
                    borderRadius: "18px",
                    border: "none",
                    background:
                      "linear-gradient(to right, #2563eb, #4f46e5)",
                    color: "white",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? "Thinking..." : "Send"}
                </button>
              </div>

              <ImageGallery images={imageGallery} />

              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard