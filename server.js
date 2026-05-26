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

      const completion =
        await openai.chat.completions.create(
          {
            model:
              "gpt-4.1-mini",

            messages: [
              {
                role:
                  "system",

                content: `
You are Aethrix AI.

Personality:
${personality}

Current Model:
${selectedModel}

You are a premium futuristic AI assistant.

Rules:
- Respond clearly and professionally.
- Avoid markdown formatting.
- Do NOT use symbols like **, *, ---, or markdown bullets.
- Write naturally using elegant paragraphs.
- Keep responses polished, intelligent, and modern.
- Sound refined, calm, and highly capable.
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

      res.json({
        reply:
          completion
            .choices[0]
            .message
            .content,
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        error:
          "Backend failed.",
      })
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