<script setup lang="ts">
import type { UserSettingsFormData } from '~/types/form'

interface Props {
  formData: UserSettingsFormData
  currentStep: number
}

const props = defineProps<Props>()

const fullName = computed(() => {
  const { firstName, lastName } = props.formData.profile
  return `${firstName} ${lastName}`.trim()
})

const isProfileStep = computed(() => props.currentStep === 0)
const isWorkspaceStep = computed(() => props.currentStep === 1)
</script>

<template>
  <div class="sticky top-4">
    <div class="space-y-4">
      <!-- Preview Content -->
      <div class="h-[500px]">
        <!-- Profile Step Preview -->
        <PreviewUserProfileStep
          v-if="isProfileStep"
          :user-name="fullName"
          :user-image="formData.profile.profileImage"
        />

        <!-- Workspace Step Preview -->
        <PreviewCompanyWorkspaceStep
          v-else-if="isWorkspaceStep"
          :company-name="formData.workspace.name"
          :company-image="formData.workspace.logo"
        />
      </div>
    </div>
  </div>
</template>

