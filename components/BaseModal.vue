<template>
  <Dialog
    v-model:visible="modelValue"
    modal
    :style="{ width: '500px', maxWidth: '95vw' }"
    class="p-fluid modern-dialog"
    :header="false"
    :closable="false"
  >
    <div class="bg-gray-900 p-6 -m-4 mb-6 flex justify-between items-center">
      <h2 class="text-xl font-semibold text-white">{{ title }}</h2>
      <Button
        icon="pi pi-times"
        class="p-button-rounded p-button-text p-button-plain"
        @click="$emit('update:modelValue', false)"
      />
    </div>

    <div class="px-2">
      <slot></slot>
    </div>
  </Dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
:deep(.modern-dialog) {
  @apply bg-gray-900 text-white;
  border-radius: 1rem;
  overflow: hidden;
}

:deep(.modern-dialog .p-dialog-content) {
  @apply bg-gray-900 text-white;
  padding: 1rem !important;
}

:deep(.p-button.p-button-plain) {
  @apply text-white;
}

:deep(.p-button.p-button-plain:hover) {
  @apply bg-gray-800;
}
</style> 