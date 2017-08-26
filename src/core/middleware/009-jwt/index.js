import authorize from "koa-jwt"

const configureKoaJwt = ({jwt: {secret: {accessToken}}}) => authorize({
  secret: accessToken,
  cookie: false,
  passThrough: true
})

export default configureKoaJwt
