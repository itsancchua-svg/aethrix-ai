import {
  motion,
} from "framer-motion"

function FloatingOrb() {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 6,

        repeat:
          Infinity,

        ease: "easeInOut",
      }}
      style={{
        position:
          "fixed",

        top: "10%",

        right: "-120px",

        width: "320px",

        height: "320px",

        borderRadius:
          "50%",

        background:
          "rgba(59,130,246,0.10)",

        filter:
          "blur(120px)",

        zIndex: 0,

        pointerEvents:
          "none",
      }}
    />
  )
}

export default FloatingOrb