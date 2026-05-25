import {
  motion,
} from "framer-motion"

function MemoryPanel({
  chat,
}) {
  const lastMessages =
    chat
      .slice(-5)
      .reverse()

  return (
    <motion.div
      whileHover={{
        y: -3,
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
      }}
    >
      <h2
        style={{
          marginTop: 0,

          marginBottom:
            "16px",

          fontSize:
            "24px",

          fontWeight:
            "700",
        }}
      >
        Memory Snapshot
      </h2>

      <p
        style={{
          marginTop: 0,

          marginBottom:
            "18px",

          color:
            "#94a3b8",

          lineHeight:
            "1.7",
        }}
      >
        Last interactions
        remembered by Aethrix AI
      </p>

      <div
        style={{
          display:
            "flex",

          flexDirection:
            "column",

          gap: "12px",
        }}
      >
        {lastMessages.length ===
        0 ? (
          <p
            style={{
              color:
                "#64748b",
            }}
          >
            No memory yet.
          </p>
        ) : (
          lastMessages.map(
            (msg,
            index) => (
              <div
                key={
                  index
                }
                style={{
                  padding:
                    "14px",

                  borderRadius:
                    "16px",

                  background:
                    "rgba(255,255,255,0.03)",

                  border:
                    "1px solid rgba(255,255,255,0.05)",

                  fontSize:
                    "14px",

                  color:
                    "#cbd5e1",
                }}
              >
                <b>
                  {msg.sender}
                  :
                </b>{" "}
                {
                  msg.text
                }
              </div>
            )
          )
        )}
      </div>
    </motion.div>
  )
}

export default MemoryPanel