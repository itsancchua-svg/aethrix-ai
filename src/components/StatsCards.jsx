import {
  motion,
} from "framer-motion"

function StatsCards({
  chatCount,
  imageCount,
  activeWorkspace,
}) {
  const stats = [
    {
      title:
        "Messages",

      value:
        chatCount,

      description:
        "Total AI conversations",
    },

    {
      title:
        "Generated Images",

      value:
        imageCount,

      description:
        "AI visuals created",
    },

    {
      title:
        "Workspace",

      value:
        activeWorkspace,

      description:
        "Current active tab",
    },
  ]

  return (
    <div
      style={{
        display:
          "grid",

        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",

        gap: "18px",

        marginBottom:
          "24px",
      }}
    >
      {stats.map(
        (
          stat,
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
            onClick={() => {
              alert(
                `${stat.title}\n\n${stat.description}`
              )
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

              transition:
                "0.25s ease",
            }}
          >
            <h3
              style={{
                marginTop: 0,

                marginBottom:
                  "14px",

                color:
                  "#93c5fd",

                fontSize:
                  "16px",

                fontWeight:
                  "600",
              }}
            >
              {stat.title}
            </h3>

            <h1
              style={{
                marginTop: 0,

                marginBottom:
                  "12px",

                fontSize:
                  "40px",

                fontWeight:
                  "800",

                letterSpacing:
                  "-2px",
              }}
            >
              {stat.value}
            </h1>

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
              {
                stat.description
              }
            </p>
          </motion.div>
        )
      )}
    </div>
  )
}

export default StatsCards