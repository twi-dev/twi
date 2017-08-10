const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, Number(ms)))

export default wait
