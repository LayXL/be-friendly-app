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
          className="min-h-[120px] p-4 rounded-lg bg-neutral-3 border border-neutral-7 focus:border-neutral-8 outline-none ring-0 resize-none transition-all"
          name="input"
          defaultValue={state.originalMessage}
          placeholder="Напишите агрессивное сообщение здесь..."
        />

        <button
          type="submit"
          disabled={pending}
          className="bg-accent-9 hover:bg-accent-10 text-neutral-contrast font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse"
        >
          {pending ? "Одружелюбливаем..." : "Одружелюбить"}
        </button>
      </div>

      {state.finalMessage && (
        <div className="bg-accent-3 border border-accent-7 rounded-lg p-4 pr-12 relative">
          <h3
            className="font-medium text-accent-11 mb-2"
            children="Предложенный вариант"
          />
          <p className="text-accent-12" children={state.finalMessage} />

          <button
            type="button"
            onClick={() =>
              navigator.clipboard.writeText(state.finalMessage ?? "")
            }
            className="absolute bottom-2 right-2 p-2 text-accent-11 hover:text-accent-12 rounded-md hover:bg-accent-4 transition-colors"
          >
            <Icon name="copy" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {typeof state.originalMessageAssessment === "number" && (
          <div className="bg-neutral-2 border border-neutral-6 rounded-lg p-4 grid gap-2">
            <h3
              className="font-medium"
              children="Оценка оригинального текста"
            />
            <p
              className="text-xl"
              children={`${state.originalMessageAssessment} %`}
            />
          </div>
        )}

        {typeof state.finalMessageAssessment === "number" && (
          <div className="bg-neutral-2 border border-neutral-6 rounded-lg p-4 grid gap-2">
            <h3 className="font-medium" children="Оценка финального текста" />
            <p
              className="text-xl"
              children={`${state.finalMessageAssessment} %`}
            />
          </div>
        )}
      </div>
    </form>
  )
}
