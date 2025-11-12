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
</script>

<template>
  <UCard>
    <div class="space-y-6">
       <!-- Profile Image Upload -->
      <ImageUpload
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
            @input="updateField('firstName', localData.firstName)"
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
            @input="updateField('lastName', localData.lastName)"
          />
        </UFormField>

        <UFormField
          label="Adresse email"
          name="email"
        >
          <UInput
            v-model="localData.email"
            type="email"
            placeholder="Renseignez votre adresse email"
            icon="i-lucide-mail"
            class="w-full"
            @input="updateField('email', localData.email)"
          />
        </UFormField>
      </div>
    </div>
  </UCard>
</template>

