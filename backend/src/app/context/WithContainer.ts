import {ContainerInstance} from "typedi"

import {BaseContext} from "./BaseContext"

export interface ContextWithContainer extends BaseContext {
  container: ContainerInstance
}
