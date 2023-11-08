import type {inferProcedureInput, inferProcedureOutput} from "@trpc/server"

import type {Router} from "../server/trpc/router.js"

import {
  isNuxtTrpcNotFoundError
} from "../lib/trpc/isNuxtTrpcNotFoundError.js"
import {notFound} from "../lib/errors/nuxt/notFound.js"

type Procedure = Router["story"]["getBySlug"]

type Slug = inferProcedureInput<Procedure>["slug"]

type Result = inferProcedureOutput<Procedure>

/**
 * Returns a story by given `slug`
 *
 * Throws `404` error if no matched story has been found
 */
export async function useStoryGetBySlug(slug: Slug): Promise<Ref<Result>> {
  const {$trpc} = useNuxtApp()

  const {error, data} = await $trpc.story.getBySlug.useQuery({slug})

  if (isNuxtTrpcNotFoundError(error)) {
    notFound()
  }

  return data as Ref<NonNullable<typeof data.value>>
}
