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
}

export function createJokers(): [Joker, Joker, Joker] {
  return [new HalfJoker(), new Joker(JokerType.CALL), new Joker(JokerType.AUDIENCE)]
}
