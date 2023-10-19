<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import ContestPane from '@/components/Contest/ContestPane.vue'
</script>

<template>
  <div class="page">
    <Logo />
    <h1>Contest</h1>

    <ContestPane
      :question="{
        text: 'Lorem ipsum dolor',
        answers: [
          { text: 'Uno', correct: false },
          { text: 'Dos', correct: false },
          { text: 'Tres', correct: true },
          { text: 'Cuatro', correct: false }
        ]
      }"
    />
  </div>
</template>
