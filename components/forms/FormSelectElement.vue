<!--
  Usage:
    <FormSelectElement />
  Props:
    v-model: typical v-model usage, REQUIRED (?)
    options: array of dropdown options, REQUIRED
    default-value: default value of dropdown, OPTIONAL (default open dropdown)
-->

<template>
  <div class="relative w-full">
    <button
      class="peer flex w-full justify-between rounded-none border-0 border-b-2 border-gray-300 bg-white px-0 py-2 placeholder-transparent shadow-none focus:border-violet-500 focus:outline-none focus:ring-0 disabled:text-gray-400"
      :class="{ 'text-gray-400': dropdownSelection == defaultValue }"
      type="button"
      @click="dropdownOpen = !dropdownOpen"
    >
      {{ dropdownSelection }}
      <svg
        class="-mr-1 ml-2 inline h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        class="bg-solid ring-solid absolute mt-2 w-full origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none"
        v-if="dropdownOpen"
      >
        <div class="flex w-full flex-col py-1">
          <button
            v-for="option in options"
            class="p-3 text-left hover:bg-violet-100"
            @click="updateDropdownSelection(option)"
            type="button"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: null,
  },
  defaultValue: {
    type: String,
    default: "open dropdown",
  },
});
const emit = defineEmits(["update:modelValue"]);

const dropdownOpen = ref(false);
const dropdownSelection = ref(props.defaultValue);

function updateDropdownSelection(option) {
  dropdownSelection.value = option;
  dropdownOpen.value = !dropdownOpen.value;
  emit("update:modelValue", option);
}
</script>
