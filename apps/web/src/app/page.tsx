import { SearchBar } from "@/shared/ui/search-bar"
import { useTranslations } from "next-intl"

export default function Page() {
  const t = useTranslations()

  return (
    <div className="flex flex-col justify-center items-center gap-2 p-4">
      <h3
        className="text-center text-xl font-semibold"
        children={t("main-title")}
      />
      <SearchBar />
    </div>
  )
}
