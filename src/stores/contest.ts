import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, StorageSerializers } from '@vueuse/core'
import type { Contest } from '@/model/Contest'
import type { Question } from '@/model/Question'

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

  watch(contest, () => {
    current.value = 0
  })

  return {
    current,
    questions: computed<Question[]>(() => contest.value?.questions || [])
  }
})
