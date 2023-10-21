import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'
import type { Contest } from '@/model/Contest'
import type { Question } from '@/model/Question'
import type { Response } from '@/model/Response'
import { createJokers, HalfJoker, resetJoker, type Joker } from '@/model/Joker'

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

function canJokerBeUsed(response: Response, joker: Joker): boolean {
  // If response is completed, cannot be used.
  if(response.completed) {
    return false;
  }

  // Duplicated jokers are allowed unless they are of Half type.
  if(!(joker instanceof HalfJoker)) {
    return true;
  }

  return !response.jokers.reduce((has, j) => {
    return has || j.type === joker.type;
  }, false);
}

export const useContestStore = defineStore('contest', () => {
  const contest = ref<Contest | undefined>(
    /*'contest',*/
    undefined,
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
      console.log(contest);
      current.value = 0
      responses.value = initializeReponses(contest.value?.questions || [])
      jokers.value = createJokers()
    },
    {
      immediate: true
    }
  )

  return {
    hasContest: computed(() => contest.value && contest.value.questions.length > 0 && responses.value.length > 0),
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
      if(!canJokerBeUsed(responses.value[index], joker)) {
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
    },
    restoreJoker: (joker: Joker) => {
      jokers.value = jokers.value.map((j) => {
        if(j.type === joker.type) {
          return resetJoker(j)
        }

        return j
      })
    }
  }
})
