import {$} from "execa"

async function assertDockerComposeInstalled(): Promise<void> {
  try {
    await $`docker compose --version`
  } catch (error) {
    throw new Error("Can't find docker compose on your machine", {
      cause: error
    })
  }
}

export async function setup(): Promise<void> {
  await assertDockerComposeInstalled()
  await $({
    stdio:"inherit"
  })`docker compose -f docker-compose.test.yaml up -d --wait`
}

export async function teardown(): Promise<void> {
  await assertDockerComposeInstalled()
  await $({
    stdio:"inherit"
  })`docker compose -f docker-compose.test.yaml down`
}
