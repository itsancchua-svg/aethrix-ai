import {
  motion,
} from "framer-motion"

function QuickActions({
  setMessage,
}) {
  const actions = [
    {
      label:
        "Startup Strategy",

      prompt:
        "Create a startup growth strategy for an AI SaaS business.",
    },

    {
      label:
        "Landing Page",

      prompt:
        "Generate a high-converting landing page copy for Aethrix AI.",
    },

    {
      label:
        "Business Analysis",

      prompt:
        "Analyze my AI startup idea and suggest improvements.",
    },

    {
      label:
        "React Component",

      prompt:
        "Build a futuristic React dashboard component.",
    },

    {
      label:
        "Marketing Campaign",

      prompt:
        "Create a marketing campaign for Aethrix AI.",
    },

    {
      label:
        "UI Inspiration",

      prompt:
        "Suggest modern SaaS UI design improvements.",
    },
  ]

  return (
    <div
      style={{
        marginBottom:
          "24px",
      }}
    >
      <h3
        style={{
          marginTop: 0,

          marginBottom:
            "18px",

          fontSize:
            "22px",

          fontWeight:
            "700",
        }}
      >
        Quick Actions
      </h3>

      <div
        style={{
          display:
            "flex",

          flexWrap:
            "wrap",

          gap: "14px",
        }}
      >
        {actions.map(
          (
            action,
            index
          ) => (
            <motion.button
              key={index}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => {
                setMessage(
                  action.prompt
                )
              }}
              style={{
                padding:
                  "14px 18px",

                borderRadius:
                  "18px",

                border:
                  "1px solid rgba(255,255,255,0.06)",

                background:
                  "rgba(255,255,255,0.04)",

                color:
                  "white",

                cursor:
                  "pointer",

                fontWeight:
                  "600",

                fontSize:
                  "14px",

                backdropFilter:
                  "blur(14px)",

                transition:
                  "0.25s ease",
              }}
            >
              {action.label}
            </motion.button>
          )
        )}
      </div>
    </div>
  )
}

export default QuickActions