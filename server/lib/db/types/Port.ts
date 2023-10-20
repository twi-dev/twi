import {
  string,
  regex,
  number,
  integer,
  minValue,
  optional,
  transform,
  union
} from "valibot"

const PortString = transform(string([regex(/^[0-9]+$$/)]), Number)

export const Port = optional(
  union([PortString, number([integer(), minValue(0)])]),

  3306
)
