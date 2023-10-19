<script setup lang="ts">
import { ref, toRefs, inject, computed } from 'vue'
import type { Ref } from 'vue'

const emit = defineEmits<{
  (evt: 'selected', id: string): void
  (evt: 'confirmed'): void
}>()

interface Props {
  id: number
  text: string
  correct: boolean
}
const props = defineProps<Props>()
const { id: rawId, correct } = toRefs(props)

const id = computed(() => ['A', 'B', 'C', 'D'][rawId.value])

const isResolved = inject<Ref<boolean>>('isResolved', ref(false))
const selectedAnswer = inject<Ref<string>>('selectedAnswer', ref('e'))
const selected = computed(() => selectedAnswer.value === id.value)

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
      selected,
      idle: isResolved,
      success: isResolved && correct,
      error: isResolved && selectedAnswer === id && !correct
    }"
    @click="onSelected"
  >
    <div class="answer-id">{{ id }}</div>
    {{ text }}
  </div>
</template>
