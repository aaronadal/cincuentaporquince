import type { Answer } from "./Answer";

export interface Question {
    text: string;
    answers: [Answer, Answer, Answer, Answer];
}
