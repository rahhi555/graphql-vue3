<script setup lang="ts">
defineProps<{ title: string, author: string }>()
defineEmits<{(e: 'update:title', value: string): void, (e: 'update:author', value: string): void}>()
</script>

<template>
  <div>
    <input 
      class="input mb-5" 
      type="text" 
      :value="title"
      @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
    >
    <input 
      class="input" 
      type="text" 
      :value="author"
      @input="$emit('update:author', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>