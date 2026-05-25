function Footer() {
  return (
    <div
      style={{
        marginTop:
          "32px",

        padding:
          "26px",

        borderRadius:
          "28px",

        background:
          "rgba(255,255,255,0.04)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        backdropFilter:
          "blur(18px)",

        textAlign:
          "center",
      }}
    >
      <h2
        style={{
          marginTop: 0,

          marginBottom:
            "12px",

          fontSize:
            "28px",

          fontWeight:
            "700",

          letterSpacing:
            "-1px",
        }}
      >
        Aethrix AI
      </h2>

      <p
        style={{
          color:
            "#94a3b8",

          maxWidth:
            "700px",

          margin:
            "0 auto",

          lineHeight:
            "1.8",

          fontSize:
            "15px",
        }}
      >
        Intelligent AI workspace
        designed for creators,
        developers, and modern
        digital experiences.
      </p>

      <div
        style={{
          marginTop:
            "24px",

          display:
            "flex",

          justifyContent:
            "center",

          gap: "14px",

          flexWrap:
            "wrap",
        }}
      >
        <button
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior:
                "smooth",
            })
          }}
          style={{
            padding:
              "12px 20px",

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
          Back To Top
        </button>

        <button
          onClick={() => {
            alert(
              "Aethrix AI\n\nBuilt by Ashley Chua."
            )
          }}
          style={{
            padding:
              "12px 20px",

            borderRadius:
              "16px",

            border:
              "1px solid rgba(255,255,255,0.08)",

            background:
              "rgba(255,255,255,0.04)",

            color:
              "white",

            cursor:
              "pointer",

            fontWeight:
              "500",
          }}
        >
          About Creator
        </button>
      </div>

      <p
        style={{
          marginTop:
            "28px",

          color:
            "#64748b",

          fontSize:
            "14px",
        }}
      >
        © 2026 Aethrix AI.
        Built by Ashley Chua.
      </p>
    </div>
  )
}

export default Footer