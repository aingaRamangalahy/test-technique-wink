<script setup lang="ts">
interface Props {
  imageType: 'profile' | 'workspace'
  label: string
  userName?: string
  modelValue?: File | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: File | null]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const displayName = ref(props.userName ?? '')

watch(
  () => props.userName,
  (newName) => {
    displayName.value = newName ?? ''
  },
  { immediate: true }
)

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    // Validate file type
    if (!file.type.match(/^image\/(png|jpeg|jpg)$/)) {
      alert('Format non supporté. Utilisez PNG ou JPEG')
      return
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Fichier trop volumineux. Maximum 5Mo')
      return
    }
    
    // Create preview immediately for better UX
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
    
    emit('update:modelValue', file)
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const removeImage = () => {
  previewUrl.value = null
  emit('update:modelValue', null)
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// Computed avatar class based on image type
const avatarClass = computed(() => {
  return props.imageType === 'profile' ? 'rounded-full' : 'rounded-lg'
})

const hasImage = computed(() => !!previewUrl.value || !!props.modelValue)
</script>

<template>
  <div class="flex flex-col gap-4">
    <label class="text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    
    <div class="flex items-center gap-6">
      <!-- Image Preview -->
      <div 
        :class="[
          'flex items-center justify-center bg-gray-100 w-20 h-20',
          avatarClass,
        ]"
      >
        <img
          v-if="previewUrl"
          :src="previewUrl"
          :alt="label"
          :class="['w-full h-full object-cover', avatarClass]"
        >
        <div v-else-if="imageType === 'profile' && displayName">
          <UAvatar
            :alt="displayName"
            :name="displayName"
            size="2xl"
          />
        </div>
        <div v-else class="text-gray-400">
          <UIcon 
            :name="imageType === 'profile' ? 'i-lucide-user' : 'i-lucide-building-2'" 
            class="w-10 h-10"
          />
        </div>
      </div>
      
      <!-- Upload Button & Instructions -->
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <UButton
            :label="hasImage ? 'Modifier la photo' : 'Ajouter une photo'"
            icon="i-lucide-upload"
            variant="outline"
            color="neutral"
            @click="triggerFileInput"
          />
          
          <UButton
            :disabled="!hasImage"
            label="Supprimer"
            variant="outline"
            color="neutral"
            @click="removeImage"
          />
        </div>
        
        <p class="text-xs text-gray-500">
          au format *.png ou *.jpeg max 5mo
        </p>
      </div>
      
      <!-- Hidden File Input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        class="hidden"
        @change="handleFileSelect"
      >
    </div>
  </div>
</template>

