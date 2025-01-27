import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Is Gluten-free?",
}

export default async function RootLayout(
  props: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>
) {
  const params = await props.params

  const messages = await getMessages()

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={[
          geistSans.variable,
          "antialiased",
          "container mx-auto",
          "bg-neutral-1 text-neutral-12",
        ].join(" ")}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider disableTransitionOnChange>
            {props.children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
