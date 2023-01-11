<!--
  Usage:
    <FormInputElement />
  Props:
    content: input label (what the input is for), REQUIRED
    v-model: typical v-model usage, OPTIONAL
    value: initial value, OPTIONAL
    disabled: true/false disable input, OPTIONAL (default false)
    input-type: type of input, OPTIONAL (default text)
  Other:
    If v-model exists, it is used as the value of the input. If it doesn't but value does, value is used as the initial value
    of the input. If neither of them exist, no default value is provided for the input.
-->

<template>
  <div class="relative">
    <textarea
      class="peer mt-2.5 rounded-lg border-2 border-gray-300 bg-white px-2 py-2 placeholder-transparent shadow-none focus:border-violet-500 focus:outline-none focus:ring-0 disabled:text-gray-400"
      :id="content"
      :placeholder="content"
      :value="modelValue ? modelValue : value ? value : ''"
      @input="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
      :type="inputType"
    />
    <label
      :for="content"
      class="absolute left-0 -top-3.5 cursor-text text-sm text-violet-500 transition-all peer-placeholder-shown:left-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:left-0 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-violet-500"
      >{{ content }}
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  content: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: null,
  },
  inputType: {
    type: String,
    default: "text",
  },
});
defineEmits(["update:modelValue"]);
</script>
