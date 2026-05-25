function TypingLoader() {
  return (
    <div
      style={{
        display: "flex",

        alignItems: "center",

        gap: "8px",

        padding: "14px 18px",

        width: "fit-content",

        borderRadius: "18px",

        background:
          "rgba(255,255,255,0.08)",

        marginTop: "10px",
      }}
    >
      {[1, 2, 3].map(
        (dot) => (
          <div
            key={dot}
            style={{
              width: "10px",

              height: "10px",

              borderRadius:
                "50%",

              background:
                "#60a5fa",

              animation:
                `bounce 1s infinite ${dot * 0.2}s`,
            }}
          />
        )
      )}

      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: scale(0.7);
              opacity: 0.5;
            }

            40% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  )
}

export default TypingLoader