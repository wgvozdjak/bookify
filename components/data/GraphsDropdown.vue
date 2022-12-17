<template>
  <div class="w-full rounded-lg bg-white/70 p-[5px] shadow-md">
    <button
      class="flex w-full items-center justify-between rounded-md px-4 py-2 text-left transition hover:bg-gray-200"
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
        <div class="flex h-96 flex-col p-4">
          <div class="mb-4">
            <button
              @click="firstContentShown = true"
              :class="{ underline: firstContentShown }"
              class="mr-2 py-1"
            >
              view graph
            </button>
            |
            <button
              @click="firstContentShown = false"
              :class="{ underline: !firstContentShown }"
              class="ml-2 py-1"
            >
              view table
            </button>
          </div>
          <!-- the h-0 feels very hacky but idk -->
          <div v-show="firstContentShown" class="h-0 flex-1">
            <slot name="graph" />
          </div>
          <div v-show="!firstContentShown">
            <slot name="table" />
          </div>
        </div>
      </div>
    </TransitionCollapseHeight>
  </div>
</template>

<script setup>
import TransitionCollapseHeight from "../TransitionCollapseHeight.vue";

const expanded = ref(false);
const firstContentShown = ref(true);
</script>
