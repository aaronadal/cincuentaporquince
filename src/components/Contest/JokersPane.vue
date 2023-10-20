<script setup lang="ts">
import { createJokers } from '@/model/Joker'
import Joker from './Joker.vue'

const jokers = createJokers()
</script>

<template>
  <div class="c-jokers-pane">
    <Joker v-for="joker in jokers" :key="joker.type" :joker="joker" />
  </div>
</template>
