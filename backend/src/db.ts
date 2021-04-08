import {createConnection, getConnection, useContainer, Connection} from "typeorm"
import {Container} from "typeorm-typedi-extensions"

useContainer(Container)

export const connect = async (): Promise<Connection> => {
  try {
    return getConnection("default")
  } catch {
    const connection: Connection = await createConnection({
      entities: [`${process.cwd()}/entity/*.ts`],
      name: "default",
      type: process.env.DB_DIALECT as any, // TODO: Fix typings for connection type
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || null,
      username: process.env.DB_USER || null,
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== "production",
      logging: true
    })

    return connection
  }
}

export const disconnect = (): Promise<void> => getConnection().close()
