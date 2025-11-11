<script setup lang="ts">
import type { UserSettingsFormData } from '~/types/form'

interface Props {
  formData: UserSettingsFormData
  currentStep: number
}

const props = defineProps<Props>()

const profileCompleted = computed(() => {
  const { firstName, lastName, email } = props.formData.profile
  return !!(firstName && lastName && email)
})

const workspaceStarted = computed(() => props.currentStep >= 1)

const hasProfileImage = computed(() => !!props.formData.profile.profileImage)
const hasWorkspaceLogo = computed(() => !!props.formData.workspace.logo)
</script>

<template>
  <UCard class="sticky top-4">
    <div class="space-y-4">
      <!-- Header -->
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-file-text" class="w-5 h-5 text-primary" />
        <h3 class="text-lg font-semibold text-gray-900">
          Résumé
        </h3>
      </div>

      <!-- Profile Section -->
      <div 
        :class="[
          'rounded-lg p-4 transition-colors',
          profileCompleted ? 'bg-primary-50' : 'bg-gray-50'
        ]"
      >
        <div class="flex items-center gap-2 mb-3">
          <UIcon 
            name="i-lucide-user" 
            :class="[
              'w-4 h-4',
              profileCompleted ? 'text-primary' : 'text-gray-400'
            ]"
          />
          <h4 
            :class="[
              'font-medium text-sm',
              profileCompleted ? 'text-gray-900' : 'text-gray-500'
            ]"
          >
            Profil personnel
          </h4>
          <UBadge
            v-if="profileCompleted"
            label="Complété"
            color="primary"
            variant="subtle"
            size="xs"
          />
        </div>

        <div v-if="profileCompleted" class="space-y-2 text-sm">
          <div v-if="hasProfileImage" class="flex items-center gap-2 text-gray-600">
            <UIcon name="i-lucide-image" class="w-3 h-3" />
            <span>Photo ajoutée</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <UIcon name="i-lucide-user" class="w-3 h-3" />
            <span>{{ formData.profile.firstName }} {{ formData.profile.lastName }}</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <UIcon name="i-lucide-mail" class="w-3 h-3" />
            <span class="truncate">{{ formData.profile.email }}</span>
          </div>
        </div>
        <p v-else class="text-xs text-gray-400">
          Complétez vos informations personnelles
        </p>
      </div>

      <!-- Workspace Section -->
      <div 
        v-if="workspaceStarted"
        :class="[
          'rounded-lg p-4 transition-colors',
          formData.workspace.name ? 'bg-primary-50' : 'bg-gray-50'
        ]"
      >
        <div class="flex items-center gap-2 mb-3">
          <UIcon 
            name="i-lucide-briefcase" 
            :class="[
              'w-4 h-4',
              formData.workspace.name ? 'text-primary' : 'text-gray-400'
            ]"
          />
          <h4 
            :class="[
              'font-medium text-sm',
              formData.workspace.name ? 'text-gray-900' : 'text-gray-500'
            ]"
          >
            Espace de travail
          </h4>
        </div>

        <div v-if="formData.workspace.name" class="space-y-2 text-sm">
          <div v-if="hasWorkspaceLogo" class="flex items-center gap-2 text-gray-600">
            <UIcon name="i-lucide-image" class="w-3 h-3" />
            <span>Logo ajouté</span>
          </div>
          <div class="flex items-center gap-2 text-gray-600">
            <UIcon name="i-lucide-briefcase" class="w-3 h-3" />
            <span class="font-medium">{{ formData.workspace.name }}</span>
          </div>
          <div v-if="formData.workspace.description" class="flex items-start gap-2 text-gray-600">
            <UIcon name="i-lucide-file-text" class="w-3 h-3 mt-0.5" />
            <span class="line-clamp-2">{{ formData.workspace.description }}</span>
          </div>
          <div v-if="formData.workspace.websiteURL" class="flex items-center gap-2 text-gray-600">
            <UIcon name="i-lucide-globe" class="w-3 h-3" />
            <a 
              :href="formData.workspace.websiteURL" 
              target="_blank" 
              class="truncate hover:text-primary transition-colors"
            >
              {{ formData.workspace.websiteURL }}
            </a>
          </div>
          <div v-if="formData.workspace.address" class="flex items-center gap-2 text-gray-600">
            <UIcon name="i-lucide-map-pin" class="w-3 h-3" />
            <span class="truncate">{{ formData.workspace.address }}</span>
          </div>
          <div v-if="formData.workspace.sector" class="flex items-center gap-2 text-gray-600">
            <UIcon name="i-lucide-building-2" class="w-3 h-3" />
            <span>{{ formData.workspace.sector }}</span>
          </div>
        </div>
        <p v-else class="text-xs text-gray-400">
          En cours de configuration...
        </p>
      </div>
    </div>
  </UCard>
</template>

