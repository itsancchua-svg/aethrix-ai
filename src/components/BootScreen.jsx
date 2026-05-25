import {
  useEffect,
  useState,
} from "react"

function BootScreen({
  onFinish,
}) {
  const [loading,
    setLoading] =
    useState(0)

  useEffect(() => {
    const interval =
      setInterval(() => {
        setLoading((prev) => {
          if (prev >= 100) {
            clearInterval(
              interval
            )

            setTimeout(() => {
              onFinish()
            }, 800)

            return 100
          }

          return prev + 2
        })
      }, 40)

    return () =>
      clearInterval(
        interval
      )
  }, [onFinish])

  return (
    <div
      style={{
        width: "100vw",

        height: "100vh",

        display: "flex",

        flexDirection:
          "column",

        justifyContent:
          "center",

        alignItems:
          "center",

        background:
          "linear-gradient(135deg, #020617 0%, #111827 100%)",

        color: "white",

        fontFamily:
          "Arial",

        overflow: "hidden",

        position:
          "relative",
      }}
    >
      <div
        style={{
          position:
            "absolute",

          width: "500px",

          height: "500px",

          background:
            "rgba(59,130,246,0.18)",

          borderRadius:
            "50%",

          filter:
            "blur(120px)",

          top: "-120px",

          right: "-120px",
        }}
      />

      <div
        style={{
          position:
            "absolute",

          width: "400px",

          height: "400px",

          background:
            "rgba(139,92,246,0.18)",

          borderRadius:
            "50%",

          filter:
            "blur(120px)",

          bottom: "-100px",

          left: "-100px",
        }}
      />

      <div
        style={{
          zIndex: 2,

          textAlign:
            "center",
        }}
      >
        <div
          style={{
            fontSize:
              "88px",

            marginBottom:
              "20px",

            animation:
              "float 3s ease-in-out infinite",
          }}
        >
          🚀
        </div>

        <h1
          style={{
            fontSize:
              "56px",

            margin: 0,

            fontWeight:
              "bold",

            letterSpacing:
              "2px",
          }}
        >
          Aethrix AI
        </h1>

        <p
          style={{
            color:
              "#94a3b8",

            marginTop:
              "16px",

            fontSize:
              "18px",

            letterSpacing:
              "1px",
          }}
        >
          The Future Operating
          System
        </p>

        <div
          style={{
            width: "320px",

            height: "12px",

            background:
              "rgba(255,255,255,0.08)",

            borderRadius:
              "999px",

            overflow:
              "hidden",

            marginTop:
              "40px",
          }}
        >
          <div
            style={{
              width: `${loading}%`,

              height: "100%",

              background:
                "linear-gradient(to right, #3b82f6, #8b5cf6)",

              transition:
                "0.2s",
            }}
          />
        </div>

        <p
          style={{
            marginTop:
              "16px",

            color:
              "#cbd5e1",

            fontSize:
              "16px",
          }}
        >
          Initializing AI Core...
          {loading}%
        </p>
      </div>

      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-12px);
            }

            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>
    </div>
  )
}

export default BootScreen