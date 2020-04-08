import {spawn, Worker, Thread} from "threads"

async function toHtml(md) {
  const convert = await spawn(new Worker("./convert"))

  const html = await convert(md).then(({contents}) => contents)

  return Thread.terminate(convert).then(() => html)
}

export default toHtml
