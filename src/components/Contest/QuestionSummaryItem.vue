<script setup lang="ts">
import type { Response } from '@/model/Response'
import JokerIcon from './JokerIcon.vue';

interface Props {
  index: number
  response: Response
  current: boolean
}
defineProps<Props>()
</script>

<template>
  <div
    class="c-question-summary-item"
    :class="{
      current,
      success: response.completed && response.success,
      error: response.completed && !response.success
    }"
  >
    Pregunta {{ index }}

    <div class="jokers" v-if="response.jokers.length > 0">
      <JokerIcon v-for="(joker, idx) in response.jokers" :key="idx" :type="joker.type" />
    </div>
  </div>
</template>
