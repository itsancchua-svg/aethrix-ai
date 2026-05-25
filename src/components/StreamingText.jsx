import {
  useEffect,
  useState,
} from "react"

function StreamingText({
  text,
}) {
  const [displayedText,
    setDisplayedText] =
    useState("")

  useEffect(() => {
    let currentIndex = 0

    setDisplayedText("")

    const interval =
      setInterval(() => {
        setDisplayedText(
          text.slice(
            0,
            currentIndex
          )
        )

        currentIndex++

        if (
          currentIndex >
          text.length
        ) {
          clearInterval(
            interval
          )
        }
      }, 6)

    return () =>
      clearInterval(
        interval
      )
  }, [text])

  return (
    <span>
      {displayedText}
    </span>
  )
}

export default StreamingText