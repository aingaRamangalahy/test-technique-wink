<script setup lang="ts">
import type { WorkspaceFormData } from '~/types/form'

interface Props {
  modelValue: WorkspaceFormData
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: WorkspaceFormData]
}>()

// Local reactive state
const localData = ref<WorkspaceFormData>({ ...props.modelValue })

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  localData.value = { ...newValue }
}, { deep: true })

// Emit updates
const updateField = <K extends keyof WorkspaceFormData>(field: K, value: WorkspaceFormData[K]) => {
  localData.value[field] = value
  emit('update:modelValue', { ...localData.value })
}
</script>

<template>
  <UCard :ui="{ root: 'ring-0' }">
    <div class="space-y-6">
      <div class="flex items-center gap-4">
        <p class="text-2xl font-medium">Créez votre espace de travail</p>
      </div>
      <!-- Workspace Logo Upload -->
      <ImageUpload
        image-type="workspace"
        label="Logo de l'entreprise"
        :model-value="localData.logo"
        @update:model-value="updateField('logo', $event)"
      />

      <!-- Form Fields -->
      <div class="space-y-4 grid grid-cols-1 gap-4">
        <!-- Workspace Name -->
        <UFormField
          label="Nom de l'entreprise"
          name="name"
          :ui="{
            label: 'after:content-[\'*\'] after:ml-1 after:text-neutral-700'
          }"
        >
          <UInput
            v-model="localData.name"
            placeholder="Renseignez le nom de votre entreprise"
            icon="i-lucide-briefcase"
            class="w-full"
            @input="updateField('name', localData.name)"
          />
        </UFormField>

        <!-- Description -->
        <UFormField
          label="Description de l'entreprise"
          name="description"
        >
          <UTextarea
            v-model="localData.description"
            placeholder="Décrivez votre entreprise brièvement:&#10;. Histoire et chiffres clés&#10;. Produits ou services commercialisés&#10;. Culture et valeurs"
            :rows="4"
            class="w-full"
            @input="updateField('description', localData.description)"
          />
        </UFormField>

        <!-- Website URL -->
        <UFormField
          label="Site internet"
          name="websiteURL"
        >
          <UInput
            v-model="localData.websiteURL"
            type="url"
            placeholder="votre-entreprise.com"
            class="w-full"
            :ui="{
              base: 'pl-18',
              leading: 'pointer-events-none bg-neutral-50 border border-gray-200 rounded-l-md px-2'
            }"
            @input="updateField('websiteURL', localData.websiteURL)"
          >
            <template #leading>
              <span class="text-sm text-muted">
                https://
              </span>
            </template>
          </UInput>
        </UFormField>

        <!-- Address -->
        <UFormField
          label="Adresse du siège social"
          name="address"
        >
          <UInput
            v-model="localData.address"
            placeholder="Renseignez l'adresse du siège de votre entreprise"
            class="w-full"
            @input="updateField('address', localData.address)"
          />
        </UFormField>

        <!-- Sector -->
        <UFormField
          label="Secteur d'activité"
          name="sector"
        >
          <UInput
            v-model="localData.sector"
            placeholder="Renseignez le secteur d'activité de votre entreprise"
            class="w-full"
            @input="updateField('sector', localData.sector)"
          />
        </UFormField>
      </div>
    </div>
  </UCard>
</template>

