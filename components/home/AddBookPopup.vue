<template>
  <Popup size="wide" ref="popup">
    <template #header>add a book</template>
    <template #default>
      <form class="space-y-6" @submit.prevent="addTitle">
        <FormInputElement v-model="title" content="book title" />
        <FormInputElement v-model="author" content="book author" />
        <FormInputElement
          v-model="rating"
          content="book rating"
          input-type="number"
        />

        <FormSelectElement
          v-model="genre"
          :options="['fantasy', 'science fiction', 'nonfiction']"
          default-value="book genre"
        />

        <FormTextareaElement v-model="description" content="description" />

        <FormInputElement v-model="start_date" content="book start date" />
        <FormInputElement v-model="finish_date" content="book end date" />

        <!-- TODO: limit rating to an integer between 1 and 5, inclusive -->
        <!-- TODO: convert book rating to a hover-click 5-star input -->

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
import FormSelectElement from "../forms/FormSelectElement.vue";
import FormTextareaElement from "../forms/FormTextareaElement.vue";

const popup = ref(null);
defineExpose({ openPopup });
function openPopup() {
  popup.value.openPopup();
}

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const title = ref("");
const author = ref("");
const rating = ref("");
const genre = ref("");
const description = ref("");
const start_date = ref("");
const finish_date = ref("");
const emit = defineEmits(["bookAdded"]);

async function insertToBooks() {
  try {
    const { data, error } = await supabase
      .from("books")
      .insert({
        title: title.value,
        author: author.value,
        genre: genre.value,
      })
      .select();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

async function insertToReadBooks(added_book_id) {
  try {
    const date = new Date();
    const date_isostring = date.toISOString();

    const start_date_obj = new Date(start_date.value);
    const finish_date_obj = new Date(finish_date.value);

    const { data, error } = await supabase
      .from("books_read")
      .insert({
        id: user.value.id,
        book_id: added_book_id,
        rating: rating.value,
        date: date_isostring,
        description: description.value,
        start_date: start_date_obj,
        finish_date: finish_date_obj,
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
