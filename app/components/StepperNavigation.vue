<script setup lang="ts">
interface Props {
  canGoPrevious: boolean
  canGoNext: boolean
  currentStep: number
  isValid: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  previous: []
  next: []
  submit: []
}>()

const isLastStep = computed(() => props.currentStep === 1)
</script>

<template>
  <div class="mt-6 pt-6">
    <div class="flex justify-between items-center w-full gap-4">
      <!-- Previous Button -->
      <UButton
        v-if="canGoPrevious"
        label="Retour"
        icon="i-lucide-arrow-left"
        variant="ghost"
        color="neutral"
        @click="emit('previous')"
      />
      <!-- Next/Submit Button -->
      <UButton
        label="Continuer"
        :disabled="!isValid"
        class="flex-1 justify-center"
        color="primary"
        @click="isLastStep ? emit('submit') : emit('next')"
      />
    </div>
  </div>
</template>

