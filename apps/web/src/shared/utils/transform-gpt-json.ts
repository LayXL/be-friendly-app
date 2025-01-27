export const transformGptJson = <T>(value?: string | null): T | null => {
  if (!value) return null

  try {
    return JSON.parse(value.slice(7, -3)) as T
  } catch (e) {
    return null
  }
}
