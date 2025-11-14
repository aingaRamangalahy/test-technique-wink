<script setup lang="ts">
import type { ProfileFormData } from '~/types/form'

interface Props {
  modelValue: ProfileFormData
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: ProfileFormData]
}>()

// Local reactive state
const localData = ref<ProfileFormData>({ ...props.modelValue })

const fullName = computed(() => {
  return `${localData.value.firstName} ${localData.value.lastName}`.trim() || ''
})

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  localData.value = { ...newValue }
}, { deep: true })

// Emit updates
const updateField = <K extends keyof ProfileFormData>(field: K, value: ProfileFormData[K]) => {
  localData.value[field] = value
  emit('update:modelValue', { ...localData.value })
}

// Email validation
const emailTouched = ref(false)
const emailError = computed(() => {
  if (!emailTouched.value) return undefined
  
  const email = localData.value.email?.trim()
  
  // Only validate format if email is provided (not required)
  if (email && email.length > 0) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return 'Veuillez entrer une adresse email valide'
    }
  }
  
  return undefined
})
</script>

<template>
  <UCard :ui="{ root: 'ring-0' }" >
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <p class="text-2xl font-medium">Faisons connaissance</p>
      </div>
       <!-- Profile Image Upload -->
      <SharedImageUpload
        image-type="profile"
        :user-name="fullName"
        label="Photo de profil"
        :model-value="localData.profileImage"
        @update:model-value="updateField('profileImage', $event)"
      />

      <!-- Form Fields -->
      <div class="space-y-4 grid grid-cols-1 gap-4">
        <!-- First Name -->
        <UFormField
          label="Prénom"
          name="firstName"
        >
          <UInput
            v-model="localData.firstName"
            placeholder="Entrez votre prénom"
            class="w-full"
            @update:model-value="updateField('firstName', $event)"
          />
        </UFormField>

        <!-- Last Name -->
        <UFormField
          label="Nom"
          name="lastName"
        >
          <UInput
            v-model="localData.lastName"
            placeholder="Entrez votre nom"
            class="w-full"
            @update:model-value="updateField('lastName', $event)"
          />
        </UFormField>

        <UFormField
          label="Adresse email"
          name="email"
          :error="emailError"
        >
          <UInput
            v-model="localData.email"
            type="email"
            placeholder="Renseignez votre adresse email"
            icon="i-lucide-mail"
            class="w-full"
            @update:model-value="updateField('email', $event)"
            @blur="emailTouched = true"
          />
        </UFormField>
      </div>
    </div>
  </UCard>
</template>

