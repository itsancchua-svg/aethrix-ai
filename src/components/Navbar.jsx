import {
  motion,
} from "framer-motion"

function Navbar({
  user,
  logout,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      style={{
        display: "flex",

        justifyContent:
          "space-between",

        alignItems: "center",

        flexWrap: "wrap",

        gap: "20px",

        marginBottom:
          "24px",

        padding:
          "22px 26px",

        borderRadius:
          "26px",

        background:
          "rgba(255,255,255,0.04)",

        border:
          "1px solid rgba(255,255,255,0.06)",

        backdropFilter:
          "blur(20px)",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,

            fontSize:
              "30px",

            fontWeight:
              "700",

            letterSpacing:
              "-1px",
          }}
        >
          Aethrix AI
        </h1>

        <p
          style={{
            color:
              "#64748b",

            marginTop:
              "6px",

            fontSize:
              "14px",
          }}
        >
          Intelligent AI Workspace
        </p>
      </div>

      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap: "14px",

          flexWrap:
            "wrap",
        }}
      >
        <div
          style={{
            background:
              "rgba(255,255,255,0.04)",

            padding:
              "10px 16px",

            borderRadius:
              "14px",

            color:
              "#cbd5e1",

            fontSize:
              "14px",

            border:
              "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {user?.email}
        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={logout}
          style={{
            padding:
              "12px 18px",

            borderRadius:
              "14px",

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

            boxShadow:
              "0 10px 25px rgba(37,99,235,0.25)",
          }}
        >
          Logout
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Navbar