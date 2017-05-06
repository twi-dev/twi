import {resolve} from "path"

import test from "ava"

import pq from "proxyquire"
import sinon from "sinon"

const fakeStatSync = shouldFails => function statSync(path) {
  if (!shouldFails) {
    return
  }

  const err = new Error(`No such file or directory ${path}`)

  err.code = "ENOENT"

  throw err
}

const HELPER_PATH = resolve(__dirname, "../../../bin/helper")

test("Should call execSync when statSync throws an ENOENT err", t => {
  t.plan(1)

  const statSync = fakeStatSync(true)

  const execSync = sinon.spy()

  const helper = pq(HELPER_PATH, {
    fs: {
      statSync
    },
    child_process: {
      execSync
    }
  })

  helper.tryDeps()

  t.true(execSync.calledTwice, "Should be called twice.")
})

test(
  "Should install dependencies with npm when \"which yarn\" invocation fails.",
  t => {
    t.plan(4)

    const statSync = fakeStatSync(true)

    const execSync = sinon.spy(command => {
      if (command !== "which yarn") {
        return
      }

      throw new Error(`Command failed: ${command}`)
    })

    const helper = pq(HELPER_PATH, {
      fs: {
        statSync
      },
      child_process: {
        execSync
      }
    })

    helper.tryDeps()

    t.true(execSync.calledTwice, "Should be called twice.")

    const [firstCallCommand] = execSync.firstCall.args
    t.is(
      firstCallCommand, "which yarn",
      "execSync should be called with \"which yarn\" command at first time."
    )

    const firstCallException = execSync.firstCall.exception
    t.is(firstCallException.message, "Command failed: which yarn")

    const [secondCallCommand] = execSync.secondCall.args
    t.is(secondCallCommand, "npm i", "Should use NPN as package manager.")
  }
)

test("Should throw an Error when statSync fails with not ENOENT code", t => {
  t.plan(1)

  const helper = pq(HELPER_PATH, {
    fs: {
      statSync() { throw new Error("Plain error withot ENOENT code") }
    },
    child_process: {
      execSync() {}
    }
  })

  const trap = () => helper.tryDeps()

  t.throws(trap, "Plain error withot ENOENT code")
})
