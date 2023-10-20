<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import ContestPane from '@/components/Contest/ContestPane.vue'
import QuestionSummary from '@/components/Contest/QuestionSummary.vue'
import { storeToRefs } from 'pinia'
import { useContestStore } from '@/stores/contest'
import JokersPane from '@/components/Contest/JokersPane.vue'
import { PhGear, PhQuestion } from "@phosphor-icons/vue";

const store = useContestStore()
const { selectResponse, completeResponse, useJoker } = store
const { questions, current, responses, jokers } = storeToRefs(store)
</script>

<template>
  <div class="page">
    <header>
      <Logo />

      <JokersPane :jokers="jokers" @use="(joker) => useJoker(current, joker)" />

      <div class="help-pane">
        <PhGear />
        <PhQuestion />
      </div>
    </header>

    <div>
      <div class="question-summary-wrapper">
        <QuestionSummary
          :responses="responses"
          :current-question="current"
          @goto="(idx) => (current = idx)"
        />
      </div>
    </div>

    <div class="contest-pane-wrapper">
      <ContestPane
        :question="questions[current]"
        :response="responses[current]"
        @select="(answer) => selectResponse(current, answer)"
        @resolve="(success) => completeResponse(current, success)"
      />
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
}

.help-pane {
  font-size: 2rem;
  display: flex;
  gap: .5rem;
  padding: 1rem;
}

.question-summary-wrapper {
  padding-left: 1rem;
}

.contest-pane-wrapper {
  padding-bottom: 2rem;
}
</style>
