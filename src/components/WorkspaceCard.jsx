import {
  motion,
} from "framer-motion"

function WorkspaceCard({
  title,
  description,
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
          "26px",

        borderRadius:
          "26px",

        background:
          "rgba(255,255,255,0.04)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        backdropFilter:
          "blur(18px)",

        position:
          "relative",

        overflow:
          "hidden",
      }}
    >
      <div
        style={{
          position:
            "absolute",

          width: "220px",

          height: "220px",

          background:
            "rgba(59,130,246,0.12)",

          borderRadius:
            "50%",

          filter:
            "blur(100px)",

          top: "-80px",

          right: "-80px",
        }}
      />

      <div
        style={{
          position:
            "relative",

          zIndex: 2,
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
          }}
        >
          <div>
            <h2
              style={{
                marginTop: 0,

                marginBottom:
                  "10px",

                fontSize:
                  "30px",

                fontWeight:
                  "800",

                letterSpacing:
                  "-1px",
              }}
            >
              {title}
            </h2>

            <p
              style={{
                margin: 0,

                color:
                  "#94a3b8",

                lineHeight:
                  "1.8",

                maxWidth:
                  "700px",
              }}
            >
              {description}
            </p>
          </div>

          <button
            onClick={() => {
              alert(
                `${title}\n\n${description}`
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

              boxShadow:
                "0 10px 25px rgba(37,99,235,0.25)",
            }}
          >
            Open Workspace
          </button>
        </div>

        <div
          style={{
            display:
              "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",

            gap: "16px",

            marginTop:
              "28px",
          }}
        >
          <div
            style={{
              padding:
                "18px",

              borderRadius:
                "18px",

              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h4
              style={{
                marginTop: 0,

                marginBottom:
                  "8px",

                color:
                  "#93c5fd",
              }}
            >
              AI Status
            </h4>

            <p
              style={{
                margin: 0,

                color:
                  "#cbd5e1",

                fontSize:
                  "14px",
              }}
            >
              Operational
            </p>
          </div>

          <div
            style={{
              padding:
                "18px",

              borderRadius:
                "18px",

              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h4
              style={{
                marginTop: 0,

                marginBottom:
                  "8px",

                color:
                  "#93c5fd",
              }}
            >
              Backend
            </h4>

            <p
              style={{
                margin: 0,

                color:
                  "#cbd5e1",

                fontSize:
                  "14px",
              }}
            >
              Connected
            </p>
          </div>

          <div
            style={{
              padding:
                "18px",

              borderRadius:
                "18px",

              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <h4
              style={{
                marginTop: 0,

                marginBottom:
                  "8px",

                color:
                  "#93c5fd",
              }}
            >
              Creator
            </h4>

            <p
              style={{
                margin: 0,

                color:
                  "#cbd5e1",

                fontSize:
                  "14px",
              }}
            >
              Ashley Chua
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WorkspaceCard