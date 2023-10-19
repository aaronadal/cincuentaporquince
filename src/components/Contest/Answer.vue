<script setup lang="ts">
import { ref, watch, toRefs, inject, computed } from 'vue';
import type { Ref } from 'vue';

const emit = defineEmits<{
    (evt: 'selected', id: string): void;
}>();

interface Props {
    id: string;
}
const props = defineProps<Props>();
const { id } = toRefs(props);

const selectedAnswer = inject<Ref<string>>('selectedAnswer', ref('e'));
const selected = computed(() => selectedAnswer.value === id.value);

function onSelected() {
    emit('selected', id.value);
}
</script>

<template>
    <div class="c-answer" :class="{ selected }" @click="onSelected">
        Hola
    </div>
</template>
