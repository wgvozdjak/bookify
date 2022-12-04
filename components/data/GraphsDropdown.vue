<template>
  <div class="w-full rounded-lg bg-white/70 p-[3px] shadow-md">
    <button
      class="flex w-full items-center justify-between rounded-md p-2 text-left transition hover:bg-gray-200"
      @click="expanded = !expanded"
    >
      <slot name="label" />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="h-5 w-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>

    <TransitionCollapseHeight>
      <div v-show="expanded">
        <!-- note to self: i don't think this padding thing is working -->
        <div class="h-96 p-12">
          <slot />
        </div>
      </div>
    </TransitionCollapseHeight>
  </div>
</template>

<script setup>
import TransitionCollapseHeight from "../TransitionCollapseHeight.vue";

const expanded = ref(false);
</script>
