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
        <div class="flex h-96 flex-col p-2">
          <div>
            <button
              @click="firstContentShown = true"
              :class="{ underline: firstContentShown }"
              class="mr-2 py-1"
            >
              show graph
            </button>
            |
            <button
              @click="firstContentShown = false"
              :class="{ underline: !firstContentShown }"
              class="ml-2 py-1"
            >
              show table
            </button>
          </div>
          <!-- the h-0 feels very hacky but idk -->
          <div v-show="firstContentShown" class="h-0 flex-1">
            <slot />
          </div>
          <div v-show="!firstContentShown">second test content</div>
          <!--<slot />-->
        </div>
      </div>
    </TransitionCollapseHeight>
  </div>
</template>

<script setup>
import TransitionCollapseHeight from "../TransitionCollapseHeight.vue";

const expanded = ref(true);
const firstContentShown = ref(true);
</script>
