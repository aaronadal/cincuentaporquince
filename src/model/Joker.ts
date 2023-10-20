import type { Answer } from "./Answer"

export enum JokerType {
  HALF,
  CALL,
  AUDIENCE
}

export class Joker {
  readonly type: JokerType
  used: boolean = false

  constructor(type: JokerType) {
    this.type = type
    this.used = false
  }
}

export class HalfJoker extends Joker {
  readonly answers: [number, number, number, number]

  constructor() {
    super(JokerType.HALF)
    this.answers = [0, 1, 2, 3].sort(() => Math.random() - 0.5) as [number, number, number, number]
  }

  filterAnswers(answers: Answer[]): number[] {
    return this.answers.filter((answer) => !answers[answer].correct).slice(0, answers.length / 2);
  }
}

export function createJokers(): [Joker, Joker, Joker] {
  return [new HalfJoker(), new Joker(JokerType.CALL), new Joker(JokerType.AUDIENCE)]
}

export function resetJoker(joker: Joker): Joker {
  if(joker instanceof HalfJoker) {
    return new HalfJoker();
  }

  return new Joker(joker.type)
}
