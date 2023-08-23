import {hash, compare} from "bcrypt"

/**
 * Hash user password using `bcrypt` algorithm
 */
export const hashPassword = (input: string | Buffer) => hash(input, 15)

export const comparePassword = (
  input: string | Buffer,
  hashed: string
) => compare(input, hashed)
