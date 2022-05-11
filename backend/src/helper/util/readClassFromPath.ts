import {basename, extname} from "path"

import {Constructable} from "helper/type/Constructable"

import readDir from "./readDir"

interface ModuleExposeClass<T> {
  default: T

  [name: string]: T
}

async function* readClassFromPath<T extends Constructable<any>>(dir: string) {
  for await (const path of readDir(dir)) {
    const m: ModuleExposeClass<T> = await import(path)
    const name = basename(path, extname(path))
    const exposedClass: T | undefined = m.default || m[name]

    if (exposedClass) {
      yield exposedClass
    }
  }
}

export default readClassFromPath
