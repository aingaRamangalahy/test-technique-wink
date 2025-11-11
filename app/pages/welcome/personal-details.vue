<script setup lang="ts">
// Apply the welcome-flow layout
definePageMeta({
  layout: 'welcome-flow'
})

const { currentStep } = useStepper()

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
</script>

<template>
  <div class="max-w-7xl mx-auto bg-white rounded-2xl py-10 px-20">
    <UStepper
      v-model="currentStep"
      :items="stepperItems"
      color="primary"
      orientation="horizontal"
      disabled
      class="w-full mb-8"
    />

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Main Form Content -->
      <div class="lg:col-span-2">
        <!-- Form content will go here -->
        <div class="text-gray-500">Main form content placeholder</div>
      </div>

      <!-- Right Column - Sidebar Preview -->
      <div class="lg:col-span-1">
        <!-- Sidebar preview will go here -->
        <div class="text-gray-500">Sidebar preview placeholder</div>
      </div>
    </div>
  </div>
</template>

