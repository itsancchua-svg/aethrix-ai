function HeroSection() {
  return (
    <div
      style={{
        padding:
          window.innerWidth < 700
            ? "70px 20px"
            : "90px 30px",

        textAlign:
          "center",

        borderRadius:
          "36px",

        background:
          "rgba(255,255,255,0.04)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        backdropFilter:
          "blur(20px)",

        marginBottom:
          "28px",

        overflow:
          "hidden",

        position:
          "relative",
      }}
    >
      <div
        style={{
          position:
            "absolute",

          width: "420px",

          height: "420px",

          background:
            "rgba(59,130,246,0.12)",

          borderRadius:
            "50%",

          filter:
            "blur(120px)",

          top: "-140px",

          right: "-120px",
        }}
      />

      <div
        style={{
          position:
            "absolute",

          width: "320px",

          height: "320px",

          background:
            "rgba(139,92,246,0.10)",

          borderRadius:
            "50%",

          filter:
            "blur(120px)",

          bottom: "-120px",

          left: "-100px",
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
              "inline-block",

            padding:
              "10px 18px",

            borderRadius:
              "999px",

            background:
              "rgba(59,130,246,0.12)",

            border:
              "1px solid rgba(96,165,250,0.18)",

            color:
              "#bfdbfe",

            fontSize:
              "14px",

            marginBottom:
              "28px",

            letterSpacing:
              "0.5px",
          }}
        >
          BUILT BY ASHLEY CHUA
        </div>

        <h1
          style={{
            fontSize:
              window.innerWidth < 700
                ? "48px"
                : "72px",

            fontWeight:
              "800",

            letterSpacing:
              "-3px",

            marginBottom:
              "24px",

            lineHeight:
              "1.05",
          }}
        >
          Aethrix AI
        </h1>

        <p
          style={{
            maxWidth:
              "760px",

            margin:
              "0 auto",

            color:
              "#94a3b8",

            fontSize:
              window.innerWidth < 700
                ? "16px"
                : "20px",

            lineHeight:
              "1.9",
          }}
        >
          Intelligent AI workspace
          designed for creators,
          developers, startups,
          and modern teams.
        </p>

        <div
          style={{
            display:
              "flex",

            justifyContent:
              "center",

            flexWrap:
              "wrap",

            gap: "16px",

            marginTop:
              "40px",
          }}
        >
          <button
            onClick={() => {
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
                "16px 28px",

              borderRadius:
                "18px",

              border:
                "none",

              background:
                "linear-gradient(to right, #2563eb, #4f46e5)",

              color:
                "white",

              fontSize:
                "15px",

              fontWeight:
                "600",

              cursor:
                "pointer",

              boxShadow:
                "0 10px 30px rgba(37,99,235,0.25)",
            }}
          >
            Launch Workspace
          </button>

          <button
            onClick={() => {
              const features =
                document.getElementById(
                  "features-section"
                )

              features?.scrollIntoView(
                {
                  behavior:
                    "smooth",
                }
              )
            }}
            style={{
              padding:
                "16px 28px",

              borderRadius:
                "18px",

              border:
                "1px solid rgba(255,255,255,0.08)",

              background:
                "rgba(255,255,255,0.04)",

              color:
                "white",

              fontSize:
                "15px",

              fontWeight:
                "500",

              cursor:
                "pointer",
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection