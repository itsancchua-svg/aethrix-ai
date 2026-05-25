import {
  motion,
} from "framer-motion"

function ModelSelector({
  selectedModel,
  setSelectedModel,
}) {
  const models = [
    {
      name:
        "GPT Core",

      desc:
        "Balanced intelligence",
    },

    {
      name:
        "GPT Turbo",

      desc:
        "Faster responses",
    },

    {
      name:
        "GPT Creative",

      desc:
        "More imaginative outputs",
    },

    {
      name:
        "GPT Precise",

      desc:
        "Highly accurate answers",
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
        AI Model Selection
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
        {models.map(
          (
            model,
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
                setSelectedModel(
                  model.name
                )
              }}
              style={{
                padding:
                  "22px",

                borderRadius:
                  "22px",

                background:
                  selectedModel ===
                  model.name
                    ? "rgba(37,99,235,0.18)"
                    : "rgba(255,255,255,0.04)",

                border:
                  selectedModel ===
                  model.name
                    ? "1px solid rgba(96,165,250,0.4)"
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
                {model.name}
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
                {model.desc}
              </p>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}

export default ModelSelector