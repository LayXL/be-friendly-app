import { Content } from "@/app/[locale]/[slug]/content"
import { Fallback } from "@/app/[locale]/[slug]/fallback"
import { getTranslations } from "next-intl/server"
import { Suspense } from "react"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Page(props: Props) {
  const t = await getTranslations()
  const params = await props.params

  return (
    <Suspense fallback={<Fallback />}>
      <Content name={params.slug} />
    </Suspense>
  )
}
