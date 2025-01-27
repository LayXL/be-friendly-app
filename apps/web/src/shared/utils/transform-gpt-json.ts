export const transformGptJson = <T>(value?: string | null): T | null => {
  if (!value) return null

  try {
    return JSON.parse(
      value.split("```json").at(-1)?.split("```").at(0) ?? ""
    ) as T
  } catch (e) {
    return null
  }
}
