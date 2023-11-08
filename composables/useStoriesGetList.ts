import type {inferProcedureInput, inferProcedureOutput} from "@trpc/server"

import type {Router} from "../server/trpc/router.js"

type Procedure = Router["stories"]["list"]

type Params = inferProcedureInput<Procedure>

type Result = inferProcedureOutput<Procedure>

export async function useStoriesGetList(
  params: Params
): Promise<Ref<Result>> {
  const {$trpc} = useNuxtApp()

  const {error, data} = $trpc.stories.list.useQuery(params)

  if (error.value) {
    throw error.value
  }

  return data as Ref<NonNullable<typeof data.value>>
}
