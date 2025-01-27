import { redirect } from "@/i18n/routing"
import { Icon } from "@/shared/ui/icon"
import cn from "@/shared/utils/cn"
import { useLocale, useTranslations } from "next-intl"

export const SearchBar = () => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className="flex flex-col items-start max-w-[512px] w-full">
      <form
        className={cn(
          "flex bg-neutral-2 border border-neutral-6 rounded-2xl transition-colors w-full",
          "hover:border-accent-6"
        )}
        action={async (formData: FormData) => {
          "use server"
          const query = formData.get("query")

          if (!query || typeof query !== "string") return

          redirect({
            href: `/${encodeURI(query)}`,
            locale,
          })
        }}
      >
        <input
          type="text"
          name="query"
          placeholder={t("search-placeholder")}
          className="bg-transparent outline-none p-3 flex-1 rounded-2xl"
        />
        <button type="submit" className="p-3">
          <Icon name="round-search" />
        </button>
      </form>
    </div>
  )
}
