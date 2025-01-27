import { transformGptJson } from "@/shared/utils/transform-gpt-json"
import type { GenerateContentResult } from "@google/generative-ai"
import ky from "ky"

export const getAnswer = async (value: string) => {
  const prompt = `
    You are an expert on diet formulation, in particular the gluten-free diet. The user needs to know if the product described below is suitable for a gluten-free diet. Feel free to analyse the ingredients, composition of the product.
    After that, write your answer in JSON format with keys: answer (yes/no/questionable string), emoji for an emoji symbol suitable for the product described by the user, an explanation to explain the answer in Markdown format and language of explanation. The explanation should be written in the language in which the product name is written by the user.
    
    For example:
    
    User's product: Chocolate
    Answer:
    {
      "answer": "questionable",
      "emoji": "🍫",
      "explanation": "While most plain milk chocolate is inherently gluten-free, it's important to check the ingredient list and allergen information. Some milk chocolates might contain added ingredients or flavorings that include gluten.",
      "locale": "en",
    }
    
    User's product: Консервированный горох
    Answer:
    {
      "answer": "yes",
      "emoji": "🫛",
      "explanation": "Обычный консервированный горошек, ингредиентами которого обычно являются горох, вода и, возможно, соль и сахар, не содержит глютена. При консервировании и приготовлении этого продукта не используются обычные ингредиенты, содержащие глютен. Поэтому он, как правило, безопасен для употребления при безглютеновой диете.",
      "locale": "ru",
    }
    
    User's product: ${value}
  `.trim()

  const result = await ky(
    "gemini-2.0-flash-thinking-exp-1219:generateContent",
    {
      method: "post",
      searchParams: { key: process.env.AI_TOKEN as string },
      json: { contents: [{ parts: [{ text: prompt }] }] },
      prefixUrl: "https://generativelanguage.googleapis.com/v1beta/models",
      next: { revalidate: 6000 },
    }
  ).json<GenerateContentResult["response"]>()

  const transformedAnswer = transformGptJson<{
    emoji: string
    answer: "yes" | "no" | "questionable"
    explanation: string
    locale: string
  }>(result.candidates?.at(0)?.content.parts.at(-1)?.text)

  if (!transformedAnswer) return null

  return {
    emoji: transformedAnswer.emoji,
    answer: transformedAnswer.answer.toLocaleLowerCase(),
    explanation: transformedAnswer.explanation,
    locale: transformedAnswer.locale,
  }
}
