function SettingsPanel({
  selectedModel,
  theme,
}) {
  return (
    <div
      style={{
        marginBottom: "30px",

        padding: "24px",

        borderRadius: "24px",

        background:
          "rgba(255,255,255,0.05)",

        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2>
        ⚙️ AI Settings
      </h2>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

          gap: "20px",

          marginTop: "20px",
        }}
      >
        <div
          style={{
            background:
              "#0f172a",

            padding: "18px",

            borderRadius: "18px",
          }}
        >
          <h3>
            Active Model
          </h3>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            {selectedModel}
          </p>
        </div>

        <div
          style={{
            background:
              "#0f172a",

            padding: "18px",

            borderRadius: "18px",
          }}
        >
          <h3>
            Current Theme
          </h3>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            {theme.name}
          </p>
        </div>

        <div
          style={{
            background:
              "#0f172a",

            padding: "18px",

            borderRadius: "18px",
          }}
        >
          <h3>
            AI Memory
          </h3>

          <p
            style={{
              color: "#22c55e",
            }}
          >
            Enabled
          </p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel