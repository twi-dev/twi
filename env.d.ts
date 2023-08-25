namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "production" | "development" | "test"

    readonly DB_NAME: string
    readonly DB_HOST?: string
    readonly DB_PORT?: string
    readonly DB_USER: string
    readonly DB_PASSWORD: string

    readonly AUTH_ORIGIN: string
    readonly AUTH_SECRET: string
  }
}
