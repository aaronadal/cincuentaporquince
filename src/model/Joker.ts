export enum JokerType {
  HALF,
  CALL,
  AUDIENCE,
}

export class Joker {
  readonly type: JokerType
  used: boolean = false

  constructor(
    type: JokerType
  ) {
    this.type = type
    this.reset()
  }

  reset() {
    this.used = false
  }
}

export class HalfJoker extends Joker {
  answers: [number, number, number, number] = [0, 1, 2, 3]

  constructor(
  ) {
    super(JokerType.HALF)
  }

  reset() {
    super.reset();

    const answersShuffle = [0, 1, 2, 3].sort(() => Math.random() - 0.5)

    this.used = false;
    this.answers = [
      answersShuffle[0],
      answersShuffle[1],
      answersShuffle[2],
      answersShuffle[3],
    ]
  }
}

export function createJokers(): [Joker, Joker, Joker] {
  return [
    new HalfJoker(),
    new Joker(JokerType.CALL),
    new Joker(JokerType.AUDIENCE),
  ]
}
