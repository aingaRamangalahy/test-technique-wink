<script setup lang="ts">
interface Props {
  userName: string
  userImage?: File | null
}

const props = defineProps<Props>()

const imageUrl = computed(() => {
  if (props.userImage) {
    return URL.createObjectURL(props.userImage)
  }
  return null
})
</script>

<template>
  <BaseStepPreview step-type="profile">
    <template #sidebar-bottom>
      <!-- User Info Under Bottom Icons -->
      <div v-if="userName" class="flex items-center mt-4 w-[210px] pt-3 border border-primary rounded-md bg-white z-2">
        <div class="flex items-center gap-3 justify-between">
          <div class="shrink-0">
            <UAvatar
              v-if="imageUrl"
              :src="imageUrl"
              :alt="userName"
              size="sm"
            />
            <UAvatar
              v-else
              :alt="userName"
              size="sm"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-medium text-gray-900 truncate">
              {{ userName }}
            </p>
          </div>
          <UIcon name="i-lucide-chevron-down" class="w-3 h-3 text-neutral-400" />
        </div>
      </div>
    </template>
  </BaseStepPreview>
</template>

