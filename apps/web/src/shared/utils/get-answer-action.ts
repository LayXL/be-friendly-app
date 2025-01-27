"use server"

import type { GenerateContentResult } from "@google/generative-ai"
import { promises as fs } from "node:fs"

import ky from "ky"
import path from "node:path"
import { transformGptJson } from "./transform-gpt-json"

const systemInstruction = await fs.readFile(
  path.join(process.cwd(), "./src/shared/utils/system-instruction.txt"),
  "utf8"
)

export async function getAnswerAction(prevState: unknown, formData: FormData) {
  const input = formData.get("input")

  const result = await ky("gemini-2.0-flash-thinking-exp:generateContent", {
    method: "post",
    searchParams: { key: process.env.AI_TOKEN as string },
    json: {
      system_instruction: { parts: { text: systemInstruction } },
      contents: { parts: { text: input } },
    },
    prefixUrl: "https://generativelanguage.googleapis.com/v1beta/models",
    next: { revalidate: 6000 },
    timeout: 60000,
  }).json<GenerateContentResult["response"]>()

  const content = transformGptJson<{
    originalMessageAssessment: number
    finalMessage: string
    finalMessageAssessment: number
  }>(result.candidates?.at(0)?.content.parts.at(0)?.text)

  console.log(result.candidates?.at(0)?.content)

  return {
    originalMessage: input?.toString() ?? "",
    ...content,
  }
}
