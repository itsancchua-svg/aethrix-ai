import axios from "axios"

export async function searchWeb(
  query
) {
  try {
    const response =
      await axios.get(
        `https://api.duckduckgo.com/?q=${query}&format=json`
      )

    return (
      response.data
        .AbstractText ||
      "No results found."
    )
  } catch (error) {
    console.log(error)

    return "Search failed."
  }
}