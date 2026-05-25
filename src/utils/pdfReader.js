import * as pdfjsLib from "pdfjs-dist"

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.mjs`

export async function extractTextFromPDF(
  file
) {
  const arrayBuffer =
    await file.arrayBuffer()

  const pdf =
    await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise

  let text = ""

  for (
    let i = 1;
    i <= pdf.numPages;
    i++
  ) {
    const page =
      await pdf.getPage(i)

    const content =
      await page.getTextContent()

    const strings =
      content.items.map(
        (item) => item.str
      )

    text +=
      strings.join(" ") + "\n"
  }

  return text
}