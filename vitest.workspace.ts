import {defineWorkspace} from "vitest/config"

export default defineWorkspace([
  {
    test: {
      name: "node",
      include: ["./**/*.node.test.ts"],
      environment: "node",
      setupFiles: [
        "./scripts/tests/setup/env.ts"
      ],
    }
  },
  {
    test: {
      name: "server",
      environment: "node",
      include: ["server/**/*.{db,trpc,server}.test.ts"],
      setupFiles: [
        "./scripts/tests/setup/env.ts",
        "./scripts/tests/setup/database.ts"
      ],
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
      environment: "jsdom",
      setupFiles: [
        "./scripts/tests/setup/env.ts"
      ],
    }
  }
])
