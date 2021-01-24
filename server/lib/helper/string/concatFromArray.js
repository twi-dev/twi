import flat from "lib/helper/array/flat"

const concatFromArray = (strings, sep = "") => flat(strings).join(sep)

export default concatFromArray
