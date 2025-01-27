"use client"

import { useActionState } from "react"
import { getAnswerAction } from "@/shared/utils/get-answer-action"
import { Icon } from "./icon"

export const Form = () => {
  const [state, formAction, pending] = useActionState(getAnswerAction, {
    originalMessage: "",
  })

  return (
    <form
      action={formAction}
      className="container mx-auto max-w-2xl flex flex-col gap-4"
    >
      <div className="flex flex-col space-y-2">
        <textarea
          className="min-h-[120px] p-4 rounded-lg border border-gray-200 focus:border-blue-500 resize-none transition-all"
          name="input"
          defaultValue={state.originalMessage}
          placeholder="Напишите агрессивное сообщение здесь..."
        />

        <button
          type="submit"
          disabled={pending}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse"
        >
          {pending ? "Одружелюбливаем..." : "Одружелюбить"}
        </button>
      </div>

      {state.finalMessage && (
        <div className="bg-green-50 border border-green-400 rounded-lg p-4 pr-12 relative">
          <h3
            className="font-medium text-green-700 mb-2"
            children="Предложенный вариант"
          />
          <p className="text-green-600" children={state.finalMessage} />

          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(state.finalMessage ?? "")
            }
            className="absolute bottom-2 right-2 p-2 text-green-600 hover:text-green-700 rounded-md hover:bg-green-100 transition-colors"
          >
            <Icon name="copy" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {typeof state.originalMessageAssessment === "number" && (
          <div className="bg-neutral-2 border border-neutral-7 rounded-lg p-4">
            <h3
              className="font-medium text-gray-700 mb-2"
              children="Оценка оригинального текста"
            />
            <p
              className="text-gray-600"
              children={`${state.originalMessageAssessment} %`}
            />
          </div>
        )}

        {typeof state.finalMessageAssessment === "number" && (
          <div className="bg-neutral-2 border border-neutral-7 rounded-lg p-4">
            <h3
              className="font-medium text-gray-700 mb-2"
              children="Оценка финального текста"
            />
            <p
              className="text-gray-600"
              children={`${state.finalMessageAssessment} %`}
            />
          </div>
        )}
      </div>
    </form>
  )
}
