<template>
  <Popup ref="popup">
    <template #header>add a book</template>
    <template #default>
      <form class="space-y-6" @submit.prevent="addTitle">
        <FormInputElement v-model="title" content="book title" />

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md border border-transparent bg-violet-500 py-2 px-4 font-medium text-white shadow-sm transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            add book
          </button>
        </div>
      </form>
    </template>
  </Popup>
</template>

<script setup>
import { ref } from "vue";
import FormInputElement from "../forms/FormInputElement.vue";

const popup = ref(null);
defineExpose({ openPopup });
function openPopup() {
  popup.value.openPopup();
}

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const title = ref("");
const emit = defineEmits(["bookAdded"]);

async function insertToBooks() {
  try {
    const { data, error } = await supabase
      .from("books")
      .insert({
        title: title.value,
      })
      .select();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

async function insertToReadBooks(added_book_id) {
  try {
    const { data, error } = await supabase
      .from("books_read")
      .insert({
        id: user.value.id,
        book_id: added_book_id,
      })
      .select();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

async function addTitle() {
  popup.value.closePopup();

  // TODO: book_titles currently is just a text string containing just the last book read. decide on best way to represent all books read
  const insertToBooksPromise = insertToBooks();
  insertToBooksPromise.then((book_data) => {
    const added_book_id = book_data[0].book_id;
    const insertToReadBooksPromise = insertToReadBooks(added_book_id);
    insertToReadBooksPromise.then((read_book_data) => {
      emit("bookAdded", book_data[0], read_book_data[0]);
    });
  });

  // the below code is to just check whether the above updating actually works
  /*const { titles, get_error } = await this.supabase
        .from("profiles")
        .select("book_titles")
        .eq("id", this.user.id);
      console.log(titles);*/
}
</script>
