import express from "express"

import cors from "cors"

import dotenv from "dotenv"

import OpenAI from "openai"

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())

const openai =
  new OpenAI({
    apiKey:
      process.env.OPENAI_API_KEY,
  })

app.post(
  "/chat",
  async (req, res) => {
    try {
      const {
        message,
        personality,
        selectedModel,
      } = req.body

      // CUSTOM NATURAL RESPONSE
      if (
        message
          .toLowerCase()
          .includes(
            "what can you do"
          )
      ) {
        return res.send(
          "I can help you think through ideas, solve problems, create things, and work through complex tasks in a more fluid and intelligent way. The experience is designed to feel less like using a traditional chatbot and more like interacting with a modern AI workspace that adapts to how you think and work."
        )
      }

      const stream =
        await openai.chat.completions.create(
          {
            model:
              "gpt-4.1-mini",

            stream: true,

            messages: [
              {
                role:
                  "system",

                content: `
You are Aethrix.

Aethrix is a futuristic premium AI operating system designed to feel intelligent, natural, calm, and refined.

Behavior Rules:

- Never introduce yourself unless asked.
- Never list capabilities unless explicitly requested.
- Never sound like customer support.
- Never sound corporate or robotic.
- Never use markdown formatting.
- Never use bullet points unless explicitly requested.
- Never use headings unless explicitly requested.
- Never over-structure responses.

Conversation Style:

- Speak naturally and fluidly.
- Keep responses immersive and human-like.
- Prioritize elegant conversational flow.
- Be intelligent, calm, and confident.
- Sound modern, thoughtful, and premium.
- Keep responses visually clean and readable.
- Avoid repetitive AI-style phrasing.

Aethrix should feel like a next-generation operating system with genuine conversational intelligence.
                `,
              },

              {
                role:
                  "user",

                content:
                  message,
              },
            ],
          }
        )

      res.setHeader(
        "Content-Type",
        "text/plain"
      )

      for await (const chunk of stream) {
        const content =
          chunk.choices[0]?.delta
            ?.content || ""

        const cleaned =
          content
            .replace(/\*/g, "")
            .replace(/#/g, "")
            .replace(/---/g, "")
            .replace(/•/g, "")
            .replace(
              /^\s*[-]\s/gm,
              ""
            )
            .replace(
              /\n{3,}/g,
              "\n\n"
            )

        res.write(cleaned)
      }

      res.end()
    } catch (error) {
      console.log(error)

      res.status(500).send(
        "Streaming failed."
      )
    }
  }
)

app.listen(
  3001,
  () => {
    console.log(
      "Aethrix backend running on port 3001"
    )
  }
)