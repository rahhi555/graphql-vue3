<script setup lang="ts">
withDefaults(defineProps<{ isModalVisible: boolean }>(), {
  isModalVisible: false
})

const emit = defineEmits<{(e: 'close'): void}>()
const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal" :class="{ 'is-active': isModalVisible }">
    <div class="modal-background"  @click.self="closeModal">
      <div class="modal-content card modal-position">
        <header class="card-header is-justify-content-center is-size-3">
          <slot name="header"></slot>
        </header>
        <div class="card-content">
          <slot name="content"></slot>
        </div>
        <div class="card-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.modal-position {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>