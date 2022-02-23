<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ title: string, author: string }>()
const emit = defineEmits<{(e: 'update:title', value: string): void, (e: 'update:author', value: string): void}>()

const compTitle = computed({
  get: () => props.title,
  set: (value) => emit('update:title', value)
})
const compAuthor = computed({
  get: () => props.author,
  set: (value) => emit('update:author', value)
})
</script>

<template>
  <div>
    <input 
      class="input mb-5" 
      type="text"
      placeholder="タイトル"
      v-model="compTitle"
    >
    <input 
      class="input" 
      type="text" 
      placeholder="著者"
      v-model="compAuthor"
    >
  </div>
</template>