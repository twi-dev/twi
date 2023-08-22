namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "production" | "development" | "test"

    DB_NAME: string
    DB_HOST?: string
    DB_PORT?: string
    DB_USER: string
    DB_PASSWORD: string
  }
}
