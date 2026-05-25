import {
  motion,
} from "framer-motion"

function FeaturesSection() {
  const features = [
    {
      title:
        "AI Conversations",

      description:
        "Advanced conversational intelligence powered by modern AI systems.",
    },

    {
      title:
        "Image Generation",

      description:
        "Generate creative visuals, concepts, and branding instantly.",
    },

    {
      title:
        "Voice Intelligence",

      description:
        "Natural voice interactions for faster and smarter workflows.",
    },

    {
      title:
        "Document Analysis",

      description:
        "Upload and analyze files with intelligent summarization.",
    },

    {
      title:
        "Creative Workflows",

      description:
        "Built for startups, creators, developers, and modern teams.",
    },

    {
      title:
        "Persistent Memory",

      description:
        "Maintain context and continuity across conversations.",
    },
  ]

  return (
    <div
      style={{
        marginBottom:
          "28px",
      }}
    >
      <h2
        style={{
          fontSize:
            "34px",

          fontWeight:
            "700",

          letterSpacing:
            "-1px",

          marginBottom:
            "14px",
        }}
      >
        Platform Capabilities
      </h2>

      <p
        style={{
          color:
            "#94a3b8",

          marginBottom:
            "28px",

          lineHeight:
            "1.8",

          maxWidth:
            "700px",
        }}
      >
        Aethrix combines
        intelligent AI systems,
        creative tooling,
        and modern workflows
        into a unified platform.
      </p>

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(260px, 1fr))",

          gap: "18px",
        }}
      >
        {features.map(
          (
            feature,
            index
          ) => (
            <motion.div
              key={index}
              whileHover={{
                y: -6,

                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
              style={{
                padding:
                  "26px",

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
                    "14px",

                  fontSize:
                    "20px",

                  fontWeight:
                    "700",
                }}
              >
                {
                  feature.title
                }
              </h3>

              <p
                style={{
                  color:
                    "#94a3b8",

                  lineHeight:
                    "1.8",

                  fontSize:
                    "15px",
                }}
              >
                {
                  feature.description
                }
              </p>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}

export default FeaturesSection