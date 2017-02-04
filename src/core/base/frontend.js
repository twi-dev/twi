import {readFile} from "promise-fs"

async function actionIndex(ctx, next) {
  ctx.body = "foo"
}
