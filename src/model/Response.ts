import type { Joker } from "./Joker"

export interface Response {
  selectedAnswer?: number
  completed: boolean
  success: boolean
  jokers: Joker[]
}
