<template>
  <Popup ref="popup">
    <template #header>create new goal</template>
    <template #default>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <FormInputElement v-model="book_count" content="book count goal" />
        <FormInputElement v-model="start_date" content="goal start date" />
        <FormInputElement v-model="end_date" content="goal end date" />

        <button
          type="submit"
          class="flex w-full justify-center rounded-md border border-transparent bg-violet-500 py-2 px-4 font-medium text-white shadow-sm transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
        >
          create goal
        </button>
      </form>
    </template>
  </Popup>
</template>

<script setup>
import Popup from "../Popup.vue";
import FormInputElement from "../forms/FormInputElement.vue";
import { ref } from "vue";

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const popup = ref(null);
defineExpose({ openPopup });
function openPopup() {
  popup.value.openPopup();
}

const book_count = ref(0);
const start_date = ref("");
const end_date = ref("");

function handleSubmit() {
  createGoal();
}

async function createGoal() {
  try {
    const start = new Date(start_date.value).toISOString();
    const { data, error } = await supabase
      .from("goals")
      .insert({
        id: user.value.id,
        book_count: book_count.value,
        start_date: new Date(start_date.value).toISOString(),
        end_date: new Date(end_date.value).toISOString(),
        status: false,
      })
      .select();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}
</script>
