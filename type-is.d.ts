declare module "type-is" {
  declare namespace typeIs {
    export declare function match(expected: string, actual: string): boolean
  }

  export = typeIs
}
