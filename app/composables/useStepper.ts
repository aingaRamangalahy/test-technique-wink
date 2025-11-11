export const useStepper = () => {
    // 0-indexed: 0 = Step 1, 1 = Step 2, 2 = Step 3
    const currentStep = ref(0)
    const totalSteps = 3

    const isStepActive = (step: number) => currentStep.value === step
    const isStepCompleted = (step: number) => currentStep.value > step
    // Step 3 is disabled for the test purpose
    // So we can only go to step 2
    const isStepDisabled = (step: number) => step >= 2
    const canGoNext = computed(() => currentStep.value < 1)
    const canGoPrevious = computed(() => currentStep.value > 0)

    const nextStep = () => {
      if (canGoNext.value) currentStep.value++
    }

    const previousStep = () => {
      if (canGoPrevious.value) currentStep.value--
    }

    const goToStep = (step: number) => {
      if (!isStepDisabled(step) && step <= currentStep.value + 1) {
        currentStep.value = step
      }
    }

    return {
      currentStep,
      totalSteps,
      isStepActive,
      isStepCompleted,
      isStepDisabled,
      canGoNext,
      canGoPrevious,
      nextStep,
      previousStep,
      goToStep
    }
  }