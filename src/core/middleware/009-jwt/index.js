import authorize from "koa-jwt"

const configureKoaJwt = ({jwt: {secret: {accessToken}}}) => authorize({
  secret: accessToken,
  cookie: false,
  passthrough: true
})

export default configureKoaJwt
