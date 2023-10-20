import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'
import type { Contest } from '@/model/Contest'
import type { Question } from '@/model/Question'
import type { Response } from '@/model/Response'
import { createJokers, HalfJoker, type Joker } from '@/model/Joker'

function initializeReponses(questions: Question[]): Response[] {
  return questions.map(() => ({
    completed: false,
    success: false,
    jokers: []
  }))
}

function updateResponse(response: Response, modifications: Partial<Response>): Response {
  return {
    selectedAnswer: modifications.selectedAnswer !== undefined ? modifications.selectedAnswer : response.selectedAnswer,
    completed: modifications.completed !== undefined ? modifications.completed : response.completed,
    success: modifications.success !== undefined ? modifications.success : response.success,
    jokers: modifications.jokers !== undefined ? modifications.jokers : response.jokers,
  }
}

function responseHasJoker(response: Response, joker: Joker): boolean {
  // Duplicated jokers are allowed unless they are of Half type.
  if(!(joker instanceof HalfJoker)) {
    return false;
  }

  return response.jokers.reduce((has, j) => {
    return has || j.type === joker.type;
  }, false);
}

export const useContestStore = defineStore('contest', () => {
  const contest = ref<Contest | undefined>(
    /*'contest',*/
    {
      questions: [
        {
          text: 'Lorem ipsum dolor',
          answers: [
            { text: 'Uno', correct: false },
            { text: 'Dos', correct: false },
            { text: 'Tres', correct: true },
            { text: 'Cuatro', correct: false }
          ]
        },
        {
          text: 'Lorem ipsum dolor 2',
          answers: [
            { text: 'Alpha', correct: false },
            { text: 'Beta', correct: false },
            { text: 'Gamma', correct: true },
            { text: 'Omega', correct: false }
          ]
        },
        {
          text: 'Lorem ipsum dolor 3',
          answers: [
            { text: 'Casíope', correct: false },
            { text: 'Loreta', correct: false },
            { text: 'Quínquenal', correct: true },
            { text: 'Londazo', correct: false }
          ]
        }
      ]
    },
    {
      serializer: StorageSerializers.object
    }
  )

  const current = ref(0)
  const responses = ref<Response[]>([])
  const jokers = ref<Joker[]>([])

  watch(
    contest,
    () => {
      current.value = 0
      responses.value = initializeReponses(contest.value?.questions || [])
      jokers.value = createJokers()
    },
    {
      immediate: true
    }
  )

  return {
    setContest: (newContest: Contest) => (contest.value = newContest),
    current,
    questions: computed<Question[]>(() => contest.value?.questions || []),
    responses: computed(() => responses.value),
    selectResponse: (index: number, answer: number) => {
      responses.value = responses.value.reduce((all, current, idx) => {
        return [
          ...all,
          index !== idx ? current : updateResponse(current, {
            selectedAnswer: answer,
          })
        ]
      }, [] as Response[])
    },
    completeResponse: (index: number, success: boolean) => {
      responses.value = responses.value.reduce((all, current, idx) => {
        return [
          ...all,
          index !== idx ? current : updateResponse(current, {
            completed: true,
            success: success,
          })
        ]
      }, [] as Response[])
    },
    jokers: computed(() => jokers.value),
    useJoker: (index: number, joker: Joker) => {
      if(responseHasJoker(responses.value[index], joker)) {
        return;
      }

      joker.used = true;

      responses.value = responses.value.reduce((all, current, idx) => {
        return [
          ...all,
          index !== idx ? current : updateResponse(current, {
            jokers: [...current.jokers, joker],
          })
        ]
      }, [] as Response[])
    }
  }
})
