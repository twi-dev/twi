import type {Input, Output} from "valibot"

import {createPageInput} from "../../utils/createPageInput.js"

export const StoryPageInput = createPageInput({maxLimit: 100})

export type IStoryPageInput = Input<typeof StoryPageInput>

export type OStoryPageInput = Output<typeof StoryPageInput>
