import {
  motion,
} from "framer-motion"

function ChatBubble({
  sender,
  text,
}) {
  const isUser =
    sender === "user"

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        display: "flex",
        justifyContent: isUser
          ? "flex-end"
          : "flex-start",
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          maxWidth: "78%",
          padding: "18px 20px",
          borderRadius: isUser
            ? "24px 24px 6px 24px"
            : "24px 24px 24px 6px",

          background: isUser
            ? "linear-gradient(135deg, #2563eb, #4f46e5)"
            : "rgba(255,255,255,0.06)",

          border: isUser
            ? "none"
            : "1px solid rgba(255,255,255,0.08)",

          color: "white",
          lineHeight: "1.8",
          fontSize: "15px",

          backdropFilter: "blur(16px)",

          boxShadow:
            "0 8px 24px rgba(0,0,0,0.25)",

          whiteSpace: "pre-wrap",
        }}
      >
        {String(text)
          .replace(/\*\*/g, "")
          .replace(/\*/g, "")}
      </div>
    </motion.div>
  )
}

export default ChatBubble