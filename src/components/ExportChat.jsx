function ExportChat({
  chat,
}) {
  const exportChat = () => {
    const content =
      chat
        .map(
          (msg) =>
            `${msg.sender.toUpperCase()}:\n${msg.text}\n`
        )
        .join("\n")

    const blob = new Blob(
      [content],
      {
        type: "text/plain",
      }
    )

    const url =
      URL.createObjectURL(
        blob
      )

    const link =
      document.createElement(
        "a"
      )

    link.href = url

    link.download =
      "aethrix-chat.txt"

    link.click()

    URL.revokeObjectURL(
      url
    )
  }

  return (
    <button
      onClick={exportChat}
      style={{
        padding:
          "14px 20px",

        borderRadius:
          "14px",

        border: "none",

        background:
          "linear-gradient(to right, #10b981, #059669)",

        color: "white",

        cursor: "pointer",

        fontWeight: "bold",

        marginBottom: "20px",
      }}
    >
      📥 Export Chat
    </button>
  )
}

export default ExportChat