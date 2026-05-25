import {
  motion,
} from "framer-motion"

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Aethrix feels incredibly smooth and modern.",

      name:
        "Early User",
    },

    {
      quote:
        "One of the cleanest AI interfaces I’ve used.",

      name:
        "Beta Tester",
    },

    {
      quote:
        "The experience feels futuristic and polished.",

      name:
        "Community Feedback",
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
        Community Feedback
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
        Early impressions and
        reactions from users
        exploring Aethrix AI.
      </p>

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",

          gap: "18px",
        }}
      >
        {testimonials.map(
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
              onClick={() => {
                alert(
                  item.quote
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
              }}
            >
              <p
                style={{
                  color:
                    "#e2e8f0",

                  lineHeight:
                    "1.9",

                  fontSize:
                    "15px",

                  marginBottom:
                    "18px",
                }}
              >
                "
                {item.quote}
                "
              </p>

              <h4
                style={{
                  margin: 0,

                  color:
                    "#93c5fd",

                  fontSize:
                    "14px",

                  fontWeight:
                    "600",
                }}
              >
                {item.name}
              </h4>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}

export default TestimonialsSection