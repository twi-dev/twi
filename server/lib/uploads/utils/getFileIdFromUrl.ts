const EXTRACT_URL_EXPR = /([^/]+)\/?$/

/**
 * Gets upload ID from given file URL
 */
export function getFileIdFromUrl(url: string): string {
  const matches = EXTRACT_URL_EXPR.exec(new URL(url).pathname)

  if (!matches) {
    throw new Error("Could not get upload ID")
  }

  return decodeURIComponent(matches[1])
}
