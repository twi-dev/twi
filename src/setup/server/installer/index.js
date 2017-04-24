import {join} from "path"

import {write} from "node-yaml"

import prompt from "setup/server/helper/prompt"

// Maybe I have to store questions as external module
const QUESTIONS = {
  app: {
    name: "Name of your app:"
  }
}

const configure = async env => await write(
  join(process.cwd(), `config/app/${env}.yaml`),
  await prompt(QUESTIONS)
)

async function setup(cmd) {
  cmd.C && await configure(cmd.parent.E)
}

export default setup
