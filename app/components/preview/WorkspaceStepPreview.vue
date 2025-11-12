<script setup lang="ts">
interface Props {
  companyName: string
  companyImage?: File | null
}

const props = defineProps<Props>()

const logoUrl = computed(() => {
  if (props.companyImage) {
    return URL.createObjectURL(props.companyImage)
  }
  return null
})
</script>

<template>
  <BaseStepPreview>
    <template #sidebar-top>
      <!-- Company Info On Top -->
      <div v-if="companyName" class="mb-4 pb-3 border-b border-neutral-200">
        <div class="flex items-center gap-3">
          <div class="shrink-0">
            <UAvatar
              v-if="logoUrl"
              :src="logoUrl"
              :alt="companyName"
              size="sm"
            />
            <UAvatar
              v-else
              :alt="companyName"
              size="sm"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold text-gray-900 truncate">
              {{ companyName }}
            </p>
          </div>
        </div>
      </div>
    </template>
  </BaseStepPreview>
</template>

