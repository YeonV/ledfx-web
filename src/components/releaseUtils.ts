export const extractFireTVCode = (body?: string): string | null => {
  if (!body) return null
  // A 7-digit Downloader code in its own fence. This used to be anchored to the
  // end of the description, which silently broke the moment the code was
  // wrapped in a <details> block — the trailing </details> is after the fence,
  // so nothing matched. Scan the whole body instead and take the last hit: the
  // FireTV section sits at the bottom in every release format used so far.
  const matches = [...body.matchAll(/```\s*(\d{7})\s*```/g)]
  return matches.length ? matches[matches.length - 1][1] : null
}
