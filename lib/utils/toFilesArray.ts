import type {MaybeNull} from "./types/MaybeNull.js"

export function toFilesArray(
  files: MaybeNull<File | File[] | FileList>
): MaybeNull<File[]> {
  if (!files) {
    return null
  }

  if (files instanceof File) {
    return []
  }

  if (Array.isArray(files)) {
    return files.slice()
  }

  return  Array.from(files)
}
