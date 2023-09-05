const EXTRACT_URL_EXPR =  /([^/]+)\/?$/

export function getFileIDFromURL(url: string): string | undefined {
  const matches = EXTRACT_URL_EXPR.exec(new URL(url).pathname)

  if (!matches) {
    return undefined
  }

  return decodeURIComponent(matches[1])
}
