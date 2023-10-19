<script setup lang="ts">
import { ref, toRefs, inject, computed } from 'vue';
import type { Ref } from 'vue';

const emit = defineEmits<{
    (evt: 'selected', id: string): void;
}>();

interface Props {
    id: number;
    text: string;
}
const props = defineProps<Props>();
const { id: rawId } = toRefs(props);

const id = computed(() => ['A', 'B', 'C', 'D'][rawId.value]);

const selectedAnswer = inject<Ref<string>>('selectedAnswer', ref('e'));
const selected = computed(() => selectedAnswer.value === id.value);

function onSelected() {
    emit('selected', id.value);
}
</script>

<template>
    <div class="c-answer" :class="{ selected }" @click="onSelected">
        <div class="answer-id">{{ id }}</div>
        {{ text }}
    </div>
</template>
