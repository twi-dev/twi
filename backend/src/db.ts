import {resolve} from "path"

import {createConnection, getConnection, useContainer, Connection} from "typeorm"
import {Container} from "typeorm-typedi-extensions"

useContainer(Container)

const connectionName = "default"

export const connect = async (): Promise<Connection> => {
  try {
    return getConnection(connectionName)
  } catch {
    const connection: Connection = await createConnection({
      entities: [resolve("src", "entity", "*.ts")],
      name: connectionName,
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

export const disconnect = (): Promise<void> => {
  const connection: Connection = getConnection(connectionName)

  if (connection.isConnected) {
    return connection.close()
  }
}
