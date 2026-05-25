function ImageGallery({
  images,
}) {
  if (images.length === 0)
    return null

  return (
    <div
      style={{
        marginTop: "40px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        🖼️ AI Image Gallery
      </h2>

      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",

          gap: "20px",
        }}
      >
        {images.map(
          (image, index) => (
            <div
              key={index}
              style={{
                background:
                  "rgba(255,255,255,0.06)",

                padding: "14px",

                borderRadius:
                  "20px",

                border:
                  "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img
                src={image}
                alt="AI Generated"

                style={{
                  width: "100%",

                  borderRadius:
                    "16px",

                  marginBottom:
                    "12px",
                }}
              />

              <a
                href={image}
                download={`aethrix-image-${index}.png`}
                style={{
                  display: "block",

                  textAlign:
                    "center",

                  padding:
                    "12px",

                  borderRadius:
                    "12px",

                  background:
                    "linear-gradient(to right, #3b82f6, #8b5cf6)",

                  color: "white",

                  textDecoration:
                    "none",

                  fontWeight:
                    "bold",
                }}
              >
                ⬇ Download
              </a>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ImageGallery