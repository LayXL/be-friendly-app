import { SearchBar } from "@/shared/ui/search-bar"
import { getAnswer } from "@/shared/utils/get-answer"
import { getTranslations } from "next-intl/server"
import { MDXRemote } from "next-mdx-remote/rsc"

type Props = {
  name: string
}

export const Content = async (props: Props) => {
  const t = await getTranslations()
  const slug = decodeURI(props.name)
  const answer = await getAnswer(slug)

  if (!answer) return null

  return (
    <div className="p-4 grid gap-2">
      <link
        rel="icon"
        href={`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${answer.emoji}</text></svg>`}
      />

      <div className="flex flex-col justify-center items-center py-32 text-center">
        <h1
          className="text-2xl font-semibold"
          children={t("title", {
            emoji: answer.emoji,
            name: slug,
          })}
        />
        <h2
          className="text-xl font-medium"
          children={t(`answer.${answer.answer}`)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold" children={t("explanation")} />
        <div className="text-neutral-11">
          <MDXRemote source={answer.explanation} />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 py-16">
        <h3
          className="text-center text-xl font-semibold"
          children={t("search-title")}
        />
        <SearchBar />
      </div>
    </div>
  )
}
