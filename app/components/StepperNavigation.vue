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
const buttonLabel = computed(() => isLastStep.value ? 'Terminer' : 'Continuer')
</script>

<template>
  <div class="mt-6 pt-6">
    <div class="grid grid-cols-3 gap-4">
      <!-- Previous Button -->
      <div class="col-span-1">
        
      <UButton
        v-if="canGoPrevious"
        label="Retour"
        icon="i-lucide-arrow-left"
        variant="ghost"
        color="neutral"
        @click="emit('previous')"
      />
      <div v-else />
      </div>

      <!-- Next/Submit Button -->
      <div class="col-span-2 flex justify-center">
        <UButton
          :label="buttonLabel"
          color="primary"
          :disabled="!isValid"
          @click="isLastStep ? emit('submit') : emit('next')"
        />
      </div>
    </div>
  </div>
</template>

