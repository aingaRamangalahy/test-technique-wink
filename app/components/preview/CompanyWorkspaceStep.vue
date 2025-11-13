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
  <PreviewBaseLayout step-type="workspace">
    <template #sidebar-top>
      <!-- Company Info Under Bottom Icons -->
      <div class="absolute top-0 left-[-11%] w-[300px] p-2 border border-primary drop-shadow drop-shadow-primary-100 rounded-md bg-white z-2">
        <div class="flex items-center gap-3 justify-between">
          <div class="shrink-0">
            <div
              v-if="logoUrl"
              class="w-8 h-8 rounded border border-neutral-200 overflow-hidden flex items-center justify-center bg-white"
            >
              <img :src="logoUrl" :alt="companyName" class="w-full h-full object-contain">
            </div>
            <div
              v-else
              class="w-8 h-8 rounded border border-neutral-200 bg-neutral-100 flex items-center justify-center"
            >
              <span class="text-xs font-semibold text-neutral-600">{{ companyName.charAt(0).toUpperCase() }}</span>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium text-gray-900 truncate">
              {{ companyName }}
            </p>
          </div>
          <UIcon name="i-lucide-settings" class="w-3 h-3 text-neutral-400" />
          <UIcon name="i-lucide-chevrons-up-down" class="w-3 h-3 text-neutral-400" />
        </div>
      </div>
    </template>
  </PreviewBaseLayout>
</template>

