<script setup lang="ts">
</script>

<template>
  <button class="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 md:px-6 md:py-3">
    <div class="grid justify-items-center">
      <p class="text-sm md:text-base">
        <slot name="icone"></slot>
      </p>
      <p class="text-sm md:text-base">
        <slot name="titulo"></slot>
      </p>
    </div>
  </button>
</template>