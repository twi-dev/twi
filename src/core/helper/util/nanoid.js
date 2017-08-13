import nano from "nanoid"

// Tiny wrapper for ai/nanoid
const nanoid = len => nano(len || 8)

export default nanoid
