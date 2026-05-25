import {
  motion,
} from "framer-motion"

function PersonalitySelector({
  personality,
  setPersonality,
}) {
  const personalities = [
    {
      name:
        "Jarvis",

      desc:
        "Formal & precise",
    },

    {
      name:
        "Creative",

      desc:
        "Imaginative & expressive",
    },

    {
      name:
        "Developer",

      desc:
        "Technical & structured",
    },

    {
      name:
        "Friendly",

      desc:
        "Casual & conversational",
    },
  ]

  return (
    <div
      style={{
        marginBottom:
          "24px",
      }}
    >
      <h2
        style={{
          marginTop: 0,

          marginBottom:
            "18px",

          fontSize:
            "26px",

          fontWeight:
            "700",
        }}
      >
        AI Personality
      </h2>

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

          gap: "16px",
        }}
      >
        {personalities.map(
          (
            item,
            index
          ) => (
            <motion.div
              key={index}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => {
                setPersonality(
                  item.name
                )
              }}
              style={{
                padding:
                  "22px",

                borderRadius:
                  "22px",

                background:
                  personality ===
                  item.name
                    ? "rgba(139,92,246,0.18)"
                    : "rgba(255,255,255,0.04)",

                border:
                  personality ===
                  item.name
                    ? "1px solid rgba(167,139,250,0.4)"
                    : "1px solid rgba(255,255,255,0.06)",

                cursor:
                  "pointer",

                transition:
                  "0.25s ease",
              }}
            >
              <h3
                style={{
                  marginTop: 0,

                  marginBottom:
                    "10px",

                  fontSize:
                    "18px",

                  fontWeight:
                    "700",
                }}
              >
                {item.name}
              </h3>

              <p
                style={{
                  margin: 0,

                  color:
                    "#94a3b8",

                  fontSize:
                    "14px",

                  lineHeight:
                    "1.6",
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}

export default PersonalitySelector