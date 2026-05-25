import {
  motion,
} from "framer-motion"

function AnalyticsPanel({
  chatCount,
  imageCount,
}) {
  const totalActivity =
    chatCount +
    imageCount

  const analytics = [
    {
      label:
        "AI Conversations",

      value:
        chatCount,
    },

    {
      label:
        "Generated Images",

      value:
        imageCount,
    },

    {
      label:
        "Platform Activity",

      value:
        totalActivity,
    },
  ]

  return (
    <div
      style={{
        marginBottom:
          "24px",
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

          flexWrap:
            "wrap",

          gap: "14px",

          marginBottom:
            "20px",
        }}
      >
        <div>
          <h2
            style={{
              marginTop: 0,

              marginBottom:
                "8px",

              fontSize:
                "28px",

              fontWeight:
                "700",
            }}
          >
            Analytics Overview
          </h2>

          <p
            style={{
              margin: 0,

              color:
                "#94a3b8",

              lineHeight:
                "1.7",
            }}
          >
            Live platform usage and
            activity insights.
          </p>
        </div>

        <button
          onClick={() => {
            alert(
              `Total Activity: ${totalActivity}`
            )
          }}
          style={{
            padding:
              "14px 20px",

            borderRadius:
              "16px",

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
          View Insights
        </button>
      </div>

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

          gap: "18px",
        }}
      >
        {analytics.map(
          (
            item,
            index
          ) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              style={{
                padding:
                  "24px",

                borderRadius:
                  "24px",

                background:
                  "rgba(255,255,255,0.04)",

                border:
                  "1px solid rgba(255,255,255,0.06)",

                backdropFilter:
                  "blur(16px)",

                cursor:
                  "pointer",
              }}
            >
              <h3
                style={{
                  marginTop: 0,

                  marginBottom:
                    "12px",

                  color:
                    "#93c5fd",

                  fontSize:
                    "16px",
                }}
              >
                {item.label}
              </h3>

              <h1
                style={{
                  marginTop: 0,

                  marginBottom:
                    "10px",

                  fontSize:
                    "42px",

                  fontWeight:
                    "800",

                  letterSpacing:
                    "-2px",
                }}
              >
                {item.value}
              </h1>

              <div
                style={{
                  height:
                    "8px",

                  width:
                    "100%",

                  borderRadius:
                    "999px",

                  background:
                    "rgba(255,255,255,0.05)",

                  overflow:
                    "hidden",
                }}
              >
                <div
                  style={{
                    width: "70%",

                    height:
                      "100%",

                    borderRadius:
                      "999px",

                    background:
                      "linear-gradient(to right, #2563eb, #4f46e5)",
                  }}
                />
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}

export default AnalyticsPanel