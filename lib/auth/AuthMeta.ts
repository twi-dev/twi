export type AuthMeta = boolean | {
  unauthenticatedOnly: boolean
  navigateAuthenticatedTo: string
}
