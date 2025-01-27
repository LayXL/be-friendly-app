import "./globals.css"

import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"
import cn from "@/shared/utils/cn"

const geistSans = localFont({
  src: "./fonts/Geist[wght].ttf",
  variable: "--font-geist-sans",
})

export const metadata: Metadata = {
  title: "Be Friendly!",
}

type Props = Readonly<{
  children: ReactNode
}>

export default async function RootLayout(props: Props) {
  return (
    <html lang={"ru"} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          geistSans.variable,
          "antialiased container mx-auto bg-neutral-1 text-neutral-12"
        )}
      >
        <ThemeProvider disableTransitionOnChange>
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  )
}
