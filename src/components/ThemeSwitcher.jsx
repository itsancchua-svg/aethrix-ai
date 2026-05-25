import {
  motion,
} from "framer-motion"

function ThemeSwitcher({
  theme,
  setTheme,
}) {
  const themes = [
    {
      name:
        "Galaxy",

      bg:
        "#020617",
    },

    {
      name:
        "Ocean",

      bg:
        "#082f49",
    },

    {
      name:
        "Midnight",

      bg:
        "#111827",
    },

    {
      name:
        "Emerald",

      bg:
        "#022c22",
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
            "18px",
        }}
      >
        <div>
          <h2
            style={{
              marginTop: 0,

              marginBottom:
                "8px",

              fontSize:
                "26px",

              fontWeight:
                "700",
            }}
          >
            Theme Customization
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
            Personalize the visual
            appearance of Aethrix AI.
          </p>
        </div>

        <button
          onClick={() => {
            alert(
              `Current Theme: ${theme.name}`
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
          Active Theme
        </button>
      </div>

      <div
        style={{
          display:
            "flex",

          flexWrap:
            "wrap",

          gap: "16px",
        }}
      >
        {themes.map(
          (
            item,
            index
          ) => (
            <motion.div
              key={index}
              whileHover={{
                y: -5,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() => {
                setTheme(
                  item
                )
              }}
              style={{
                padding:
                  "20px",

                borderRadius:
                  "22px",

                minWidth:
                  "170px",

                background:
                  item.bg,

                border:
                  theme.name ===
                  item.name
                    ? "2px solid #60a5fa"
                    : "1px solid rgba(255,255,255,0.08)",

                cursor:
                  "pointer",

                transition:
                  "0.25s ease",

                boxShadow:
                  theme.name ===
                  item.name
                    ? "0 10px 30px rgba(37,99,235,0.25)"
                    : "none",
              }}
            >
              <h3
                style={{
                  marginTop: 0,

                  marginBottom:
                    "10px",

                  color:
                    "white",

                  fontSize:
                    "18px",

                  fontWeight:
                    "700",
                }}
              >
                {item.name}
              </h3>

              <div
                style={{
                  height:
                    "10px",

                  width:
                    "100%",

                  borderRadius:
                    "999px",

                  background:
                    "rgba(255,255,255,0.15)",

                  overflow:
                    "hidden",
                }}
              >
                <div
                  style={{
                    width:
                      "70%",

                    height:
                      "100%",

                    borderRadius:
                      "999px",

                    background:
                      "linear-gradient(to right, #60a5fa, #8b5cf6)",
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

export default ThemeSwitcher