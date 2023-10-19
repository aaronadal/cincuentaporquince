<script setup lang="ts">
import { ref } from 'vue';

const selected = ref(false);
</script>

<template>
    <div class="c-answer" :class="{ selected }" @click="selected = true">
        Hola
    </div>
</template>
