"use client"

import { useActionState } from "react"
import { getAnswerAction } from "@/shared/utils/get-answer-action"
import { Icon } from "./icon"

type FormProps = {
  withDivider?: boolean
}

export const Form = (props: FormProps) => {
  const [state, formAction, pending] = useActionState(getAnswerAction, {
    originalMessage: "",
  })

  return (
    <>
      <form
        action={formAction}
        className="container mx-auto max-w-2xl flex flex-col gap-4"
      >
        {props.withDivider && (
          <div className="px-4">
            <div className="h-px w-full bg-neutral-6 rounded-full" />
          </div>
        )}

        <div className="flex flex-col space-y-2">
          {!state.finalMessage ? (
            <textarea
              className="min-h-[120px] p-4 rounded-lg bg-neutral-3 border border-neutral-7 focus:border-neutral-8 outline-none ring-0 resize-none transition-all"
              name="input"
              defaultValue={state.originalMessage}
              placeholder="Напишите агрессивное сообщение здесь..."
            />
          ) : (
            <p
              className="min-h-[120px] p-4 rounded-lg bg-neutral-3 border border-neutral-7 focus:border-neutral-8 outline-none ring-0 resize-none transition-all"
              children={state.originalMessage}
            />
          )}

          {!state.finalMessage && (
            <button
              type="submit"
              disabled={pending}
              className="bg-accent-9 hover:bg-accent-10 text-neutral-contrast font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-pulse"
            >
              {pending ? "Одружелюбливаем..." : "Одружелюбить"}
            </button>
          )}
        </div>

        {state.finalMessage && (
          <div className="bg-accent-3 border border-accent-7 rounded-lg p-4 relative grid gap-2">
            <div className="flex items-baseline justify-between w-full text-accent-11">
              <h3 className="font-medium" children="Предложенный вариант" />

              <p className="text-sm">
                {state.originalMessageAssessment} % →{" "}
                {state.finalMessageAssessment} %
              </p>
            </div>

            <p className="text-accent-12 pr-8" children={state.finalMessage} />

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
      </form>
      {state.finalMessage && <Form withDivider={true} />}
    </>
  )
}
