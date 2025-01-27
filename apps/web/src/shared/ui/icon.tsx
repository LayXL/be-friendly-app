import cn from "@/shared/utils/cn"
import type { ClassValue } from "clsx"

export type IconProps = {
  name: string
  size?: number
  color?: string
  className?: ClassValue
}

export const Icon = (props: IconProps) => {
  const size = props.size ?? 24

  const styles = {
    "--size": `${size}px`,
    maskImage: `url(/icons/${props.name}.svg)`,
    maskPosition: "center center",
    maskSize: "var(--size)",
    color: props.color ?? "currentcolor",
  }

  return (
    <span
      className={cn("block size-[var(--size)] bg-current", props.className)}
      style={styles}
    />
  )
}
