import {
  motion,
} from "framer-motion"

function AIStatus({
  selectedModel,
  activeTab,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{
        duration: 0.2,
      }}
      style={{
        marginBottom:
          "24px",

        padding:
          "24px",

        borderRadius:
          "26px",

        background:
          "rgba(255,255,255,0.04)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        backdropFilter:
          "blur(18px)",

        display:
          "flex",

        justifyContent:
          "space-between",

        alignItems:
          "center",

        flexWrap:
          "wrap",

        gap: "18px",
      }}
    >
      <div>
        <h2
          style={{
            marginTop: 0,

            marginBottom:
              "10px",

            fontSize:
              "28px",

            fontWeight:
              "700",
          }}
        >
          Aethrix Status
        </h2>

        <p
          style={{
            margin: 0,

            color:
              "#94a3b8",

            lineHeight:
              "1.7",

            maxWidth:
              "700px",
          }}
        >
          AI systems are online
          and operational.
          Current workspace:
          {` ${activeTab}`}
        </p>
      </div>

      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap: "14px",

          flexWrap:
            "wrap",
        }}
      >
        <div
          style={{
            padding:
              "14px 18px",

            borderRadius:
              "18px",

            background:
              "rgba(34,197,94,0.12)",

            border:
              "1px solid rgba(34,197,94,0.25)",

            color:
              "#86efac",

            fontWeight:
              "600",

            fontSize:
              "14px",
          }}
        >
          ● ONLINE
        </div>

        <button
          onClick={() => {
            alert(
              `Current Model: ${selectedModel}`
            )
          }}
          style={{
            padding:
              "14px 18px",

            borderRadius:
              "18px",

            border:
              "none",

            background:
              "linear-gradient(to right, #2563eb, #4f46e5)",

            color:
              "white",

            cursor:
              "pointer",

            fontWeight:
              "600",
          }}
        >
          {selectedModel}
        </button>
      </div>
    </motion.div>
  )
}

export default AIStatus