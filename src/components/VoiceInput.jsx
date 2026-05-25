import {
  useState,
} from "react"

import {
  motion,
} from "framer-motion"

function VoiceInput({
  setMessage,
}) {
  const [isListening,
    setIsListening] =
    useState(false)

  const startVoice =
    () => {
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition

      if (!SpeechRecognition) {
        alert(
          "Voice input not supported in this browser."
        )
        return
      }

      const recognition =
        new SpeechRecognition()

      recognition.lang =
        "en-US"

      recognition.interimResults =
        false

      recognition.continuous =
        false

      recognition.start()

      setIsListening(true)

      recognition.onresult =
        (event) => {
          const text =
            event.results[0][0]
              .transcript

          setMessage(
            text
          )

          setIsListening(
            false
          )
        }

      recognition.onerror =
        () => {
          setIsListening(
            false
          )
        }

      recognition.onend =
        () => {
          setIsListening(
            false
          )
        }
    }

  return (
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={startVoice}
      style={{
        padding:
          "16px",

        borderRadius:
          "18px",

        border:
          "1px solid rgba(255,255,255,0.06)",

        background:
          isListening
            ? "rgba(239,68,68,0.2)"
            : "rgba(255,255,255,0.04)",

        color:
          "white",

        cursor:
          "pointer",
      }}
    >
      {isListening
        ? "🎤..."
        : "Voice"}
    </motion.button>
  )
}

export default VoiceInput