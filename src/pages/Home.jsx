import { Link } from "react-router-dom"

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",

        background:
          "radial-gradient(circle at top, #1e3a8a 0%, #020617 70%)",

        color: "white",

        fontFamily: "Arial",

        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "30px 60px",

          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
          }}
        >
          🚀 aethrix
        </h1>

        <div
          style={{
            display: "flex",

            gap: "20px",
          }}
        >
          <Link to="/login">
            <button
              style={{
                padding:
                  "14px 24px",

                borderRadius:
                  "14px",

                border:
                  "1px solid rgba(255,255,255,0.2)",

                background:
                  "transparent",

                color: "white",

                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button
              style={{
                padding:
                  "14px 24px",

                borderRadius:
                  "14px",

                border: "none",

                background:
                  "linear-gradient(to right, #3b82f6, #8b5cf6)",

                color: "white",

                cursor: "pointer",
              }}
            >
              Get Started
            </button>
          </Link>
        </div>
      </div>

      <div
        style={{
          display: "flex",

          justifyContent:
            "space-between",

          alignItems: "center",

          padding: "80px 60px",

          flexWrap: "wrap",

          gap: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
          }}
        >
          <h1
            style={{
              fontSize: "82px",

              lineHeight: "1.1",

              marginBottom: "30px",
            }}
          >
            The Future of
            <br />
            AI Workspaces
          </h1>

          <p
            style={{
              fontSize: "22px",

              color: "#cbd5e1",

              lineHeight: "1.7",

              marginBottom: "40px",
            }}
          >
            aethrix is a futuristic
            multimodal AI operating
            system for startups,
            creators, developers,
            and businesses.
          </p>

          <div
            style={{
              display: "flex",

              gap: "20px",
            }}
          >
            <Link to="/signup">
              <button
                style={{
                  padding:
                    "18px 34px",

                  borderRadius:
                    "18px",

                  border: "none",

                  fontSize: "18px",

                  background:
                    "linear-gradient(to right, #3b82f6, #8b5cf6)",

                  color: "white",

                  cursor: "pointer",
                }}
              >
                Launch aethrix 🚀
              </button>
            </Link>

            <button
              style={{
                padding:
                  "18px 34px",

                borderRadius:
                  "18px",

                border:
                  "1px solid rgba(255,255,255,0.2)",

                background:
                  "transparent",

                color: "white",

                fontSize: "18px",

                cursor: "pointer",
              }}
            >
              Watch Demo
            </button>
          </div>
        </div>

        <div
          style={{
            width: "420px",

            background:
              "rgba(255,255,255,0.08)",

            border:
              "1px solid rgba(255,255,255,0.1)",

            backdropFilter:
              "blur(14px)",

            borderRadius: "30px",

            padding: "30px",
          }}
        >
          <h2>
            🌌 aethrix OS
          </h2>

          <div
            style={{
              marginTop: "30px",

              display: "flex",

              flexDirection:
                "column",

              gap: "20px",
            }}
          >
            {[
              "🤖 AI Chat System",

              "🎨 AI Image Studio",

              "🧠 AI Memory Engine",

              "📂 AI File Analysis",

              "💼 Startup Strategist",

              "⚡ Business Automation",
            ].map((feature) => (
              <div
                key={feature}
                style={{
                  padding: "18px",

                  borderRadius:
                    "16px",

                  background:
                    "#0f172a",
                }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "60px",

          marginTop: "60px",
        }}
      >
        <h1
          style={{
            textAlign: "center",

            fontSize: "54px",

            marginBottom: "50px",
          }}
        >
          Why aethrix?
        </h1>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",

            gap: "24px",
          }}
        >
          {[
            {
              title:
                "Multimodal Intelligence",

              desc:
                "Chat, images, files, and AI workflows in one platform.",
            },

            {
              title:
                "Startup Operating System",

              desc:
                "Built for founders, developers, and creators.",
            },

            {
              title:
                "Cloud AI Infrastructure",

              desc:
                "Persistent memory powered by Firebase and OpenAI.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background:
                  "rgba(255,255,255,0.06)",

                borderRadius:
                  "24px",

                padding: "30px",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h2>
                {item.title}
              </h2>

              <p
                style={{
                  color: "#cbd5e1",

                  marginTop: "14px",

                  lineHeight: "1.7",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home