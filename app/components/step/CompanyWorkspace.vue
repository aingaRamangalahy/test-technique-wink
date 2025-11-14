<script setup lang="ts">
import type { WorkspaceFormData } from '~/types/form'

interface Props {
  modelValue: WorkspaceFormData
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: WorkspaceFormData]
  'previous': []
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

const goBack = () => {
  emit('previous')
}

// Validation state
const nameTouched = ref(false)
const nameError = computed(() => {
  if (!nameTouched.value) return undefined
  return !localData.value.name || localData.value.name.trim() === '' 
    ? 'Le nom de l\'entreprise est requis' 
    : undefined
})

// Brandfetch integration
const { fetchCompanyData, downloadImageAsFile, getBestLogo, extractDomain, error: brandfetchError } = useBrandfetch()
const toast = useToast()
const isFetching = ref(false)
const fetchSuccess = ref(false)
const urlInputRef = ref<HTMLInputElement | null>(null)

const handleUrlKeydown = async (event: KeyboardEvent) => {
  if (event.key === 'Enter' && canFetch.value) {
    await fetchBrandData()
  }
}

// Clear all data except URL
const clearFormData = () => {
  const currentUrl = localData.value.websiteURL
  updateField('name', '')
  updateField('description', '')
  updateField('address', '')
  updateField('sector', '')
  updateField('logo', null)
  updateField('websiteURL', currentUrl)
  nameTouched.value = false
}

const fetchBrandData = async () => {
  if (!localData.value.websiteURL || isFetching.value) return
  
  isFetching.value = true
  fetchSuccess.value = false
  
  try {
    const domain = extractDomain(localData.value.websiteURL)
    
    if (!domain) {
      clearFormData()
      toast.add({
        title: 'URL invalide',
        description: 'Veuillez entrer une URL de site web valide',
        color: 'error',
        icon: 'i-lucide-alert-circle'
      })
      return
    }

    // Clear form data before fetching new data
    clearFormData()

    const data = await fetchCompanyData(domain)
    if (data) {
      // Update company name
      if (data.name) {
        updateField('name', data.name)
      }
      
      // Update description (use longDescription if available, otherwise description)
      const descriptionText = data.longDescription || data.description
      if (descriptionText) {
        updateField('description', descriptionText)
      }
      
      // Update sector/industry from company.industries array
      if (data.company?.industries && data.company.industries.length > 0) {
        // Get the primary industry (first one, or the one with highest score)
        const primaryIndustry = data.company.industries.reduce((prev, current) => 
          (current.score > prev.score) ? current : prev
        )
        updateField('sector', primaryIndustry.name)
      }
      
      // Update website URL to the canonical domain (with https:// prefix)
      if (data.domain) {
        const fullUrl = data.domain.startsWith('http') ? data.domain : `https://${data.domain}`
        updateField('websiteURL', fullUrl.replace(/^https?:\/\//, ''))
      }
      
      // Update address from company location
      if (data.company?.location) {
        const location = data.company.location
        const addressParts = [
          location.city,
          location.state,
          location.country
        ].filter(Boolean)
        
        if (addressParts.length > 0) {
          updateField('address', addressParts.join(', '))
        }
      }
      
      // Download and set logo
      const logoUrl = getBestLogo(data)
      if (logoUrl) {
        // Determine file extension from URL
        const urlExtension = logoUrl.match(/\.(svg|png|webp|jpeg|jpg)(\?|$)/i)?.[1] || 'png'
        const logoFile = await downloadImageAsFile(logoUrl, `${domain}-logo.${urlExtension}`)
        if (logoFile) {
          updateField('logo', logoFile)
        }
      }
      
      fetchSuccess.value = true
      
      toast.add({
        title: 'Données récupérées !',
        description: 'Les informations de l\'entreprise ont été automatiquement remplies',
        color: 'success',
        icon: 'i-lucide-check-circle'
      })
    } else if (brandfetchError.value) {
      clearFormData()
      toast.add({
        title: 'Impossible de récupérer les données',
        description: brandfetchError.value,
        color: 'warning',
        icon: 'i-lucide-info'
      })
    }
  } catch (e) {
    const error = e as Error
    clearFormData()
    toast.add({
      title: 'Erreur',
      description: error.message || 'Échec de la récupération des données de l\'entreprise',
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    isFetching.value = false
    // Reset success animation after 2 seconds
    if (fetchSuccess.value) {
      setTimeout(() => {
        fetchSuccess.value = false
      }, 2000)
    }
  }
}

// Computed to check if URL is valid for fetching
const canFetch = computed(() => {
  return localData.value.websiteURL && localData.value.websiteURL.length > 3 && !isFetching.value
})
</script>

<template>
  <UCard :ui="{ root: 'ring-0' }">
    <div class="space-y-6">
      <UButton label="Retour" variant="ghost" color="neutral" size="sm" icon="i-lucide-chevron-left" @click="goBack" />
      <div class="flex items-center gap-4">
        <p class="text-2xl font-medium">Créez votre espace de travail</p>
      </div>
      <!-- Workspace Logo Upload -->
      <SharedImageUpload
        image-type="workspace"
        label="Logo de l'entreprise"
        :model-value="localData.logo"
        :disabled="isFetching"
        @update:model-value="updateField('logo', $event)"
      />

      <!-- Form Fields -->
      <div class="space-y-4 grid grid-cols-1 gap-4">
        <!-- Workspace Name -->
        <UFormField
          label="Nom de l'entreprise"
          name="name"
          :error="nameError"
          :ui="{
            label: 'after:content-[\'*\'] after:ml-1 after:text-neutral-700'
          }"
        >
          <UInput
            v-model="localData.name"
            placeholder="Renseignez le nom de votre entreprise"
            icon="i-lucide-briefcase"
            class="w-full"
            :disabled="isFetching"
            required
            @update:model-value="updateField('name', $event)"
            @blur="nameTouched = true"
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
            :disabled="isFetching"
            @update:model-value="updateField('description', $event)"
          />
        </UFormField>

        <!-- Website URL -->
        <UFormField
          label="Site internet"
          name="websiteURL"
        >
          <div class="flex gap-2 items-center">
            <div class="flex-1 relative">
              <UInput
                ref="urlInputRef"
                v-model="localData.websiteURL"
                type="url"
                placeholder="votre-entreprise.com"
                class="w-full"
                :ui="{
                  base: 'pl-18',
                  leading: 'pointer-events-none bg-neutral-50 border border-gray-200 rounded-l-md px-2'
                }"
                @update:model-value="updateField('websiteURL', $event)"
                @keydown.enter="handleUrlKeydown"
              >
                <template #leading>
                  <span class="text-sm text-muted">
                    https://
                  </span>
                </template>
              </UInput>
            </div>
            
            <!-- Loading Indicator -->
            <Transition
              enter-active-class="transition-opacity duration-200"
              enter-from-class="opacity-0"
              enter-to-class="opacity-100"
              leave-active-class="transition-opacity duration-200"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div v-if="isFetching" class="flex items-center gap-2 text-primary-600">
                <UIcon name="i-lucide-loader-2" class="w-5 h-5 animate-spin" />
              </div>
            </Transition>
          </div>
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
            :disabled="isFetching"
            @update:model-value="updateField('address', $event)"
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
            :disabled="isFetching"
            @update:model-value="updateField('sector', $event)"
          />
        </UFormField>
      </div>
    </div>
  </UCard>
</template>

