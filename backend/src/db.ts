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
      entities: [resolve(process.env.SERVER_ROOT, "entity", "*.ts")],
      name: connectionName,
      type: process.env.DATABASE_DRIVER as any, // TODO: Fix typings for connection type
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || null,
      username: process.env.DATABASE_USER || null,
      password: process.env.DATABASE_PASSWORD || null,
      database: process.env.DATABASE_NAME,
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
