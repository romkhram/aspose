<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {},
  label: {}
})
const emit = defineEmits([
  'update:modelValue'
])

const vModel = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>
<template>
  <div class="bc-slider">
    <div class="text-caption">{{ label }}</div>
    <q-slider
      v-model="vModel"
      :min="200"
      :max="990"
      label
      :label-value="vModel + 'px'"
      label-always
      switch-label-side
    />
  </div>
</template>
