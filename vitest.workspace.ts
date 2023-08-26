import {defineWorkspace} from "vitest/config"

export default defineWorkspace([
  {
    test: {
      name: "node",
      include: ["**/*.test.ts"],
      environment: "node"
    }
  },
  {
    test: {
      name: "server",
      environment: "node",
      include: ["server/**/*.{db,trpc,node}.test.ts"],
      globalSetup: [
        "./scripts/tests/globalSetup/database.ts"
      ]
    }
  },
  {
    extends: "./vitest.config.ts",
    test: {
      name: "vue",
      include: ["**/*.{vue,nuxt}.test.{ts,tsx}"],
      environment: "jsdom"
    }
  }
])
