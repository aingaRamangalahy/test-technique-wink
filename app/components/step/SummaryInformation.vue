<script setup lang="ts">
import type { UserSettingsFormData } from '~/types/form'

interface Props {
  formData: UserSettingsFormData
}

const props = defineProps<Props>()

// Create preview URLs for images
const profileImageUrl = computed(() => {
  if (props.formData.profile.profileImage) {
    return URL.createObjectURL(props.formData.profile.profileImage)
  }
  return null
})

const workspaceLogoUrl = computed(() => {
  if (props.formData.workspace.logo) {
    return URL.createObjectURL(props.formData.workspace.logo)
  }
  return null
})

const fullName = computed(() => {
  return `${props.formData.profile.firstName} ${props.formData.profile.lastName}`.trim()
})
</script>

<template>
  <div class="space-y-6">
    <!-- Profile Information -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <UIcon name="i-lucide-user" class="w-5 h-5" />
        Informations personnelles
      </h3>
      
      <div class="bg-gray-50 rounded-lg p-4 space-y-4">
        <!-- Profile Image -->
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
            <img
              v-if="profileImageUrl"
              :src="profileImageUrl"
              :alt="fullName"
              class="w-full h-full object-cover"
            >
            <UAvatar
              v-else
              :name="fullName"
              :alt="fullName"
              size="xl"
            />
          </div>
          <div>
            <p class="font-medium text-gray-900">{{ fullName }}</p>
            <p class="text-sm text-gray-600">{{ formData.profile.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
          <div>
            <p class="text-xs text-gray-500 mb-1">Prénom</p>
            <p class="text-sm font-medium text-gray-900">{{ formData.profile.firstName }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500 mb-1">Nom</p>
            <p class="text-sm font-medium text-gray-900">{{ formData.profile.lastName }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Workspace Information -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <UIcon name="i-lucide-briefcase" class="w-5 h-5" />
        Espace de travail
      </h3>
      
      <div class="bg-gray-50 rounded-lg p-4 space-y-4">
        <!-- Company Logo and Name -->
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-lg overflow-hidden bg-white border border-gray-200 flex items-center justify-center shrink-0">
            <img
              v-if="workspaceLogoUrl"
              :src="workspaceLogoUrl"
              :alt="formData.workspace.name"
              class="w-full h-full object-contain"
            >
            <UIcon
              v-else
              name="i-lucide-building-2"
              class="w-8 h-8 text-gray-400"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900">{{ formData.workspace.name }}</p>
            <p v-if="formData.workspace.websiteURL" class="text-sm text-gray-600 truncate">
              {{ formData.workspace.websiteURL }}
            </p>
          </div>
        </div>

        <!-- Company Details -->
        <div class="space-y-3 pt-2 border-t border-gray-200">
          <div v-if="formData.workspace.description">
            <p class="text-xs text-gray-500 mb-1">Description</p>
            <div class="max-h-24 overflow-y-auto text-sm text-gray-900 pr-2 custom-scrollbar">
              {{ formData.workspace.description }}
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div v-if="formData.workspace.sector">
              <p class="text-xs text-gray-500 mb-1">Secteur d'activité</p>
              <p class="text-sm font-medium text-gray-900">{{ formData.workspace.sector }}</p>
            </div>
            
            <div v-if="formData.workspace.address">
              <p class="text-xs text-gray-500 mb-1">Adresse du siège social</p>
              <div class="max-h-16 overflow-y-auto text-sm font-medium text-gray-900 pr-2 custom-scrollbar">
                {{ formData.workspace.address }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f7fafc;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>

