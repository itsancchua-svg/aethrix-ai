import {
  motion,
} from "framer-motion"

function Sidebar({
  activeTab,
  setActiveTab,
}) {
  const tabs = [
    "AI Chat",
    "Workspace",
    "Analytics",
    "Images",
    "Memory",
    "Settings",
  ]

  return (
    <div
      style={{
        width:
          window.innerWidth <
          900
            ? "100%"
            : "260px",

        background:
          "rgba(255,255,255,0.04)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        borderRadius:
          "28px",

        padding:
          "22px",

        backdropFilter:
          "blur(18px)",

        height:
          "fit-content",
      }}
    >
      <h2
        style={{
          marginTop: 0,

          marginBottom:
            "24px",

          fontSize:
            "22px",

          fontWeight:
            "700",
        }}
      >
        Workspace
      </h2>

      <div
        style={{
          display:
            "flex",

          flexDirection:
            "column",

          gap: "12px",
        }}
      >
        {tabs.map(
          (tab) => (
            <motion.button
              key={tab}
              whileHover={{
                x: 6,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => {
                setActiveTab(
                  tab
                )

                const chatSection =
                  document.getElementById(
                    "chat-section"
                  )

                chatSection?.scrollIntoView(
                  {
                    behavior:
                      "smooth",
                  }
                )
              }}
              style={{
                padding:
                  "16px 18px",

                borderRadius:
                  "18px",

                border:
                  activeTab ===
                  tab
                    ? "1px solid rgba(96,165,250,0.4)"
                    : "1px solid rgba(255,255,255,0.05)",

                background:
                  activeTab ===
                  tab
                    ? "linear-gradient(to right, rgba(37,99,235,0.25), rgba(79,70,229,0.25))"
                    : "rgba(255,255,255,0.03)",

                color:
                  "white",

                textAlign:
                  "left",

                cursor:
                  "pointer",

                fontWeight:
                  activeTab ===
                  tab
                    ? "700"
                    : "500",

                fontSize:
                  "15px",

                transition:
                  "0.25s ease",
              }}
            >
              {tab}
            </motion.button>
          )
        )}
      </div>

      <div
        style={{
          marginTop:
            "30px",

          padding:
            "18px",

          borderRadius:
            "20px",

          background:
            "rgba(59,130,246,0.08)",

          border:
            "1px solid rgba(96,165,250,0.12)",
        }}
      >
        <h3
          style={{
            marginTop: 0,

            marginBottom:
              "10px",

            fontSize:
              "16px",
          }}
        >
          Ashley Chua
        </h3>

        <p
          style={{
            margin: 0,

            color:
              "#94a3b8",

            lineHeight:
              "1.7",

            fontSize:
              "14px",
          }}
        >
          Creator of Aethrix AI.
          Building futuristic AI
          experiences with React,
          Firebase, and OpenAI.
        </p>
      </div>
    </div>
  )
}

export default Sidebar