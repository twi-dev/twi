export function notFound(message?: string): never {
  throw createError({statusCode: 404, message})
}
