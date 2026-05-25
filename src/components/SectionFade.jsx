import {
  motion,
} from "framer-motion"

function SectionFade({
  children,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      viewport={{
        once: true,
      }}
    >
      {children}
    </motion.div>
  )
}

export default SectionFade