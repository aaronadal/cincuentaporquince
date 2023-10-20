<script setup lang="ts">
import JokerIcon from './JokerIcon.vue'
import { toRefs } from 'vue';

interface Props {
  joker: Joker
}
const props = defineProps<Props>()
const { joker } = toRefs(props);
</script>

<template>
  <div 
    class="c-joker"
    :class="{
        used: joker.used
    }"
  >
    <JokerIcon :type="joker.type" />
  </div>
</template>
