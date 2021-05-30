import {InputType, Field, ID} from "type-graphql"

@InputType({isAbstract: true})
abstract class NodeInput {
  #id!: number

  set id(value: string | number) {
    this.#id = Number(value)
  }

  @Field(() => ID)
  get id(): number {
    return this.#id
  }
}

export default NodeInput
