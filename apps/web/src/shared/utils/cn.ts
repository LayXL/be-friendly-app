import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hover = (className: string) => {
  return cn(className)
    .split(" ")
    .map((x) => `hover:${x}`)
    .join(" ")
    .trim()
}

export const active = (className: string) => {
  return cn(className)
    .split(" ")
    .map((x) => `active:${x}`)
    .join(" ")
    .trim()
}

export const prefix = (prefix: string, className: string) => {
  return cn(className)
    .split(" ")
    .map((x) => `${prefix}:${x}`)
    .join(" ")
    .trim()
}
