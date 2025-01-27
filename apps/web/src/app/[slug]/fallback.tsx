import { SearchBar } from "@/shared/ui/search-bar"
import { useTranslations } from "next-intl"

export const Fallback = () => {
  const t = useTranslations()

  return (
    <div className="px-2 py-3 grid gap-2">
      <div className="flex flex-col justify-center items-center py-32 text-center">
        <div className="text-2xl h-[1lh] w-32 bg-neutral-3 rounded-full animate-pulse" />
        <div className="text-xl h-[.8lh] mt-[.2lh] w-16 bg-neutral-3 rounded-full animate-pulse" />
      </div>

      <div>
        <h3 className="text-lg font-semibold" children={t("explanation")} />
        <div className="bg-neutral-3 h-[1lh] w-full rounded-full animate-pulse" />
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
