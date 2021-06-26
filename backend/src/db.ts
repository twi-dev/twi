import {createConnection, getConnection, useContainer, Connection} from "typeorm"
import {Container} from "typeorm-typedi-extensions"

useContainer(Container)

export const connect = async (): Promise<Connection> => {
  try {
    return getConnection()
  } catch {
    return createConnection({
      type: process.env.DATABASE_DRIVER! as any,
      host: process.env.DATABASE_HOST || undefined,
      port: parseInt(process.env.DATABASE_PORT!, 10) || undefined,
      database: process.env.DATABASE_NAME!,
      username: process.env.DATABASE_USER || undefined,
      password: process.env.DATABASE_PASSWORD || undefined,
      subscribers: [process.env.DATABASE_SUBSCRIBERS!],
      entities: [process.env.DATABASE_ENTITIES!],
      synchronize: process.env.NODE_ENV !== "production",
      logging: true
    })
  }
}

export const disconnect = async (): Promise<void> => {
  const connection: Connection = getConnection()

  if (connection.isConnected) {
    await connection.close()
  }
}
