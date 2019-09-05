import redis from "async-redis"

const store = redis.createClient()

export default store
