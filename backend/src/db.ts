import {
  createConnection,
  getConnection,
  useContainer,
  Connection,
  LoggerOptions
} from "typeorm"
import {Container} from "typeorm-typedi-extensions"

useContainer(Container)

interface ConnectOptions {
  synchronize?: boolean
  logging?: LoggerOptions
  dropSchema?: boolean
  database?: string
}

export const connect = async (
  {synchronize, logging, dropSchema, database}: ConnectOptions = {}
): Promise<Connection> => {
  try {
    return getConnection()
  } catch {
    return createConnection({
      type: "mysql", // Gonna stick with MySQL, at least for now.
      host: process.env.DATABASE_HOST || undefined,
      port: parseInt(process.env.DATABASE_PORT!, 10) || undefined,
      database: database || process.env.DATABASE_NAME!,
      username: process.env.DATABASE_USER || undefined,
      password: process.env.DATABASE_PASSWORD || undefined,
      subscribers: [process.env.DATABASE_SUBSCRIBERS!],
      entities: [process.env.DATABASE_ENTITIES!],
      synchronize: synchronize || process.env.NODE_ENV !== "production",
      logging: logging || process.env.NODE_ENV !== "test",
      dropSchema
    })
  }
}

export const disconnect = async (): Promise<void> => {
  const connection: Connection = getConnection()

  if (connection.isConnected) {
    await connection.close()
  }
}
