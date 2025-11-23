export const extractFireTVCode = (body?: string): string | null => {
  if (!body) return null
  // Match 7 digits wrapped in triple backticks at the end of the description
  const match = body.match(/```\s*(\d{7})\s*```\s*$/)
  return match ? match[1] : null
}
