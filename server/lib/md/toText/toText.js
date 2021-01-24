import {spawn, Worker, Thread} from "threads"

async function toText(md) {
  const convert = await spawn(new Worker("./convert"))

  const text = await convert(md).then(({contents}) => contents)

  return Thread.terminate(convert).then(() => text)
}

export default toText
