// import {join} from "path"

// import {write} from "node-yaml"

// import prompt from "setup/helper/prompt"
import createSU from "setup/signup"

// Maybe I have to store questions as external module
// const QUESTIONS = {
//   app: {
//     name: "Name of your app:"
//   }
// }

// const configure = async env => await write(
//   join(process.cwd(), `config/app/${env}.yaml`),
//   await prompt(QUESTIONS)
// )

async function setup(cmd, env) {
  // cmd.C && await configure(cmd.parent.E)

  await createSU(env)
}

export default setup
