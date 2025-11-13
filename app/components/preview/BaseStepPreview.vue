<script setup lang="ts">
defineProps<{
  stepType?: 'profile' | 'workspace' | undefined
}>()
</script>
<template>
  <div class="h-full flex bg-white rounded-lg shadow-md">
    <!-- Sidebar -->
    <div class="w-48 bg-white border-r border-neutral-200 flex flex-col py-4 px-3 shrink-0">
      <!-- Top Slot (for company info) -->
      <slot name="sidebar-top" />

      <template v-if="stepType && stepType === 'profile'">
        <div class="flex bg-neutral-50 p-2 rounded-md mb-4 items-center gap-3">
          <div class="w-10 h-7 bg-white border border-neutral-200 flex items-center justify-center rounded" />
          <USkeleton class="h-2 w-24 rounded" />
          <UIcon name="i-lucide-settings" class="w-4 h-4 text-neutral-400" />
          <UIcon name="i-lucide-chevrons-up-down" class="w-4 h-4 text-neutral-400" />
        </div>
      </template>
      <!-- Top Icons -->
      <div class="flex flex-col gap-3 flex-1" :class="{ 'mt-14': stepType && stepType === 'workspace' }">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-layout-dashboard" class="w-3 h-3 text-neutral-400 shrink-0" />
          <USkeleton class="h-2 w-20 rounded" />
        </div>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-briefcase" class="w-3 h-3 text-neutral-400 shrink-0" />
          <USkeleton class="h-2 w-20 rounded" />
        </div>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-users" class="w-3 h-3 text-neutral-400 shrink-0" />
          <USkeleton class="h-2 w-20 rounded" />
        </div>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-mail" class="w-3 h-3 text-neutral-400 shrink-0" />
          <USkeleton class="h-2 w-20 rounded" />
        </div>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-trending-up" class="w-3 h-3 text-neutral-400 shrink-0" />
          <USkeleton class="h-2 w-20 rounded" />
        </div>
      </div>
      
      <!-- Bottom Icons -->
      <div class="flex flex-col gap-3" :class="{ 'mb-10': stepType && stepType === 'profile' }">
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-user-plus" class="w-3 h-3 text-neutral-400 shrink-0" />
          <USkeleton class="h-2 w-20 rounded" />
        </div>
        <div class="flex items-center gap-3">
          <UIcon name="i-lucide-megaphone" class="w-3 h-3 text-neutral-400 shrink-0" />
          <USkeleton class="h-2 w-20 rounded" />
        </div>
      </div>

      <!-- Bottom Slot (for user info) -->
      <slot name="sidebar-bottom" />
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Dashboard Header -->
      <div class="bg-white border-b border-neutral-200 h-10 px-4 py-3 flex items-center justify-between shrink-0">
        <div class="flex-1" />
        <div class="flex items-center justify-center">
          <img src="/logo.svg" alt="Logo" class="w-10 h-10">
        </div>
        <div class="flex-1 flex items-center justify-end gap-3">
          <UIcon name="i-lucide-bell" class="w-4 h-4 text-neutral-400" />
          <UIcon name="i-lucide-megaphone" class="w-4 h-4 text-neutral-400" />
          <UIcon name="i-lucide-help-circle" class="w-4 h-4 text-neutral-400" />
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex-1 bg-neutral-50 p-4 min-w-0" />
    </div>
  </div>
</template>

