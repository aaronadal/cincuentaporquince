import type { Question } from './Question'

export interface Contest {
  questions: Question[]
}

export function ensureContestValid(contest: any) {
  if(typeof contest !== 'object' || !('questions' in contest) || !Array.isArray(contest.questions)) {
    throw new Error('Debe ser un objeto con un atributo "questions" de tipo array');
  }

  contest.questions.forEach((question: any, index: number) => {
    if(typeof question !== 'object') {
      throw new Error(`La pregunta en la posición ${index} debe ser un objeto`);
    }

    if(!('text' in question)) {
      throw new Error(`La pregunta en la posición ${index} debe tener una propiedad "text"`);
    }

    if(!('answers' in question) || !Array.isArray(question.answers)) {
      throw new Error(`La pregunta en la posición ${index} debe tener una propiedad "answers" de tipo array`);
    }

    let correctCount = 0;
    question.answers.forEach((answer: any, index: number) => {
      if(typeof answer !== 'object') {
        throw new Error(`La respuesta ${index} de la pregunta en la posición ${index} debe ser un objeto`);
      }

      if(!('text' in answer)) {
        throw new Error(`La respuesta ${index} de la pregunta en la posición ${index} debe tener una propiedad "text"`);
      }

      if(!('correct' in answer)) {
        throw new Error(`La respuesta ${index} de la pregunta en la posición ${index} debe tener una propiedad "correct"`);
      }

      correctCount = correctCount + (answer.correct ? 1 : 0);
    });

    if(correctCount === 0) {
      throw new Error(`La pregunta en la posición ${index} no tiene ninguna respuesta marcada como correcta`);
    }
    else if(correctCount > 1) {
      throw new Error(`La pregunta en la posición ${index} tiene ${correctCount} respuestas marcadas como correctas`);
    }
  });
}
