<script setup lang="ts">
</script>

<template>
  <div>
    <header class="flex justify-center h-10 py-2">
      <img src="/logo.svg" alt="Logo" >
    </header>
    <div class="mx-auto bg-neutral-50 min-h-[calc(100vh-2.5rem)] px-16 py-32">
      <slot />
    </div>
  </div>
</template>

<style scoped>
</style>

