import {write} from "node-yaml"

import prompt from "setup/server/helper/prompt"

// Maybe I have to store questions as external module
const QUESTIONS = {
  app: {
    name: "Name of your app:"
  }
}

const configure = async () => (
  await write(`${process.cwd()}/config/app/user.yaml`, await prompt(QUESTIONS))
)

async function setup(cmd) {
  cmd.C && await configure()
}

export default setup
