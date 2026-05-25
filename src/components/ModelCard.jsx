function ModelCard({
  name,
  selectedModel,
  setSelectedModel,
}) {
  const active =
    selectedModel === name

  return (
    <div
      onClick={() =>
        setSelectedModel(name)
      }
      style={{
        padding: "20px",

        borderRadius: "18px",

        cursor: "pointer",

        background: active
          ? "linear-gradient(to right, #3b82f6, #8b5cf6)"
          : "rgba(255,255,255,0.05)",

        border: active
          ? "2px solid #60a5fa"
          : "1px solid rgba(255,255,255,0.08)",

        transition: "0.3s",
      }}
    >
      <h3>{name}</h3>

      <p
        style={{
          color: active
            ? "white"
            : "#94a3b8",
        }}
      >
        {active
          ? "ACTIVE"
          : "Click to activate"}
      </p>
    </div>
  )
}

export default ModelCard