<script setup lang="ts">
import { ref, toRefs, inject, computed } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits<{
  (evt: 'selected', id: number): void
  (evt: 'confirmed'): void
}>()

interface Props {
  id: number
  text: string
  correct: boolean
}
const props = defineProps<Props>()
const { id } = toRefs(props)

const letter = computed(() => ['A', 'B', 'C', 'D'][id.value])

const selectedAnswer = inject<Ref<number|undefined>>('selectedAnswer', ref(undefined))
const completed = inject<Ref<boolean>>('completed', ref(false))
const success = inject<Ref<boolean>>('success', ref(false))

function onSelected() {
  if (selectedAnswer.value === id.value) {
    emit('confirmed')

    return
  }

  emit('selected', id.value)
}
</script>

<template>
  <div
    class="c-answer"
    :class="{
      idle: completed,
      selected: selectedAnswer === id,
      success: completed && correct,
      error: completed && selectedAnswer === id && !success
    }"
    @click="onSelected"
  >
    <div class="answer-id">{{ letter }}</div>
    {{ text }}
  </div>
</template>
