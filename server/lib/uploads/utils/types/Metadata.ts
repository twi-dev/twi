import type {MaybeNull} from "../../../../../lib/utils/types/MaybeNull.js"

export interface Metadata {
  relativePath?: MaybeNull<string>
  name?: MaybeNull<string>
  type?: MaybeNull<string>
  filetype?: MaybeNull<string>
  filename?: MaybeNull<string>
}
