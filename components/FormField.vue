<template>
  <div>
    <label class="block text-sm font-medium text-gray-400 mb-2">
      {{ label }}
    </label>
    
    <component
      :is="component"
      v-bind="$attrs"
      :modelValue="modelValue"
      @update:modelValue="$emit('update:modelValue', $event)"
      :class="[
        'w-full bg-gray-800 border-gray-700 text-white',
        $attrs.class
      ]"
    />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Number, Boolean],
    required: true
  },
  component: {
    type: String,
    default: 'InputText'
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
:deep(.p-inputtext:enabled:focus) {
  border-color: #3B82F6;
  box-shadow: 0 0 0 2px #93C5FD;
}

:deep(.p-dropdown-panel) {
  @apply bg-gray-900 border-gray-700;
}

:deep(.p-dropdown-item) {
  @apply text-white;
}

:deep(.p-dropdown-item:hover) {
  @apply bg-gray-800;
}

:deep(.p-inputnumber-input) {
  @apply bg-gray-800 border-gray-700 text-white;
}

:deep(.p-dropdown) {
  @apply bg-gray-800 border-gray-700;
}

:deep(.p-dropdown-trigger) {
  @apply text-gray-400;
}

:deep(.p-dropdown:not(.p-disabled).p-focus) {
  @apply border-blue-500;
  box-shadow: 0 0 0 2px #93C5FD;
}
</style> 