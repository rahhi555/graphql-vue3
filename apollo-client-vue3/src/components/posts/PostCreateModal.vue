<script setup lang="ts">
defineProps<{ title: string, content: string }>()
defineEmits<{(e: 'update:title', value: string): void, (e: 'update:content', value: string): void}>()
</script>

<template>
  <div>
    <input 
      class="input" 
      type="text" 
      :title="title"
      @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>