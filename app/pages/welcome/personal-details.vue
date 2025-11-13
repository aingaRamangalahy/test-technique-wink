<script setup lang="ts">
import StepUserProfile from '~/components/step/UserProfile.vue'
import StepCompanyWorkspace from '~/components/step/CompanyWorkspace.vue'
import StepSummaryInformation from '~/components/step/SummaryInformation.vue'

// Apply the welcome-flow layout
definePageMeta({
  layout: 'welcome-flow'
})

// Import composables
const { currentStep, canGoNext, canGoPrevious, nextStep, previousStep } = useStepper()
const { formData, validateProfile, validateWorkspace, updateProfile, updateWorkspace } = useFormData()

// Dialog state
const isDialogOpen = ref(false)

// Stepper configuration
const stepperItems = [
  {
    title: 'Faison connaissance',
    value: 1
  },
  {
    title: 'créer votre espace de travail',
    value: 2
  },
  {
    title: 'Pour mieux vous connaitre',
    value: 3,
    disabled: true
  }
]

// Navigation handlers
const handleNext = () => {
  if (currentStep.value === 0 && validateProfile()) {
    nextStep()
  }
}

const handlePrevious = () => {
  previousStep()
}

const handleSubmit = () => {
  if (validateWorkspace()) {
    console.log('Form submitted:', formData.value)
    // Show success dialog with summary
    isDialogOpen.value = true
    // TODO: Handle form submission (API call, etc.)
  }
}

// Computed validation state
const isCurrentStepValid = computed(() => {
  if (currentStep.value === 0) {
    return validateProfile()
  }
  return validateWorkspace()
})
</script>

<template>
  <div class="max-w-7xl mx-auto bg-white rounded-2xl py-10 pl-20 pr-0">
    <!-- Stepper -->
    <UStepper
      v-model="currentStep"
      :items="stepperItems"
      color="primary"
      orientation="horizontal"
      disabled
      class="w-full mb-8"
    />

    <!-- Content: Two Column Layout (Form Left, Sidebar Right) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-40">
      <!-- Left Column - Form Steps -->
      <div class="lg:col-span-1 space-y-6">
        <KeepAlive :include="['StepUserProfile', 'StepCompanyWorkspace']">
          <StepUserProfile
            v-if="currentStep === 0"
            :model-value="formData.profile"
            @update:model-value="updateProfile"
          />
          <StepCompanyWorkspace
            v-else-if="currentStep === 1"
            :model-value="formData.workspace"
            @update:model-value="updateWorkspace"
            @previous="handlePrevious"
          />
        </KeepAlive>
        <!-- Navigation -->
        <StepperNavigation
          :can-go-previous="canGoPrevious"
          :can-go-next="canGoNext"
          :current-step="currentStep"
          :is-valid="isCurrentStepValid"
          @previous="handlePrevious"
          @next="handleNext"
          @submit="handleSubmit"
        />
      </div>

      <!-- Right Column - Sidebar -->
      <div class="lg:col-span-1">
        <PreviewPanel
          :form-data="formData"
          :current-step="currentStep"
        />
      </div>
    </div>

    <!-- Success Dialog -->
    <UModal
      v-model:open="isDialogOpen"
      title="Félicitations !"
      :ui="{
        content: 'max-w-2xl'
      }"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">
              Félicitations, vos informations ont été sauvegardées avec succès
            </h2>
          </div>
        </div>
      </template>

      <template #body>
        <StepSummaryInformation :form-data="formData" />
      </template>

      <template #footer="{ close }">
        <div class="flex justify-end gap-3">
          <UButton
            color="primary"
            size="lg"
            @click="close"
          >
            Fermer
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

