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
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        display:
          "flex",

        justifyContent:
          isUser
            ? "flex-end"
            : "flex-start",

        marginBottom:
          "14px",
      }}
    >
      <div
        style={{
          maxWidth:
            "75%",

          padding:
            "16px 18px",

          borderRadius:
            isUser
              ? "18px 18px 4px 18px"
              : "18px 18px 18px 4px",

          background:
            isUser
              ? "linear-gradient(to right, #2563eb, #4f46e5)"
              : "rgba(255,255,255,0.05)",

          color:
            "white",

          border:
            isUser
              ? "none"
              : "1px solid rgba(255,255,255,0.06)",

          fontSize:
            "15px",

          lineHeight:
            "1.6",

          backdropFilter:
            "blur(10px)",
        }}
      >
        {text}
      </div>
    </motion.div>
  )
}

export default ChatBubble