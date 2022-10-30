<template>
  <Popup ref="popup">
    <template #header>add a book</template>
    <template #default>
      <form class="space-y-6" @submit.prevent="addTitle">
        <div>
          <label for="title" class="block">book title</label>
          <div class="mt-1">
            <input
              class=""
              type="text"
              id="title"
              name="title"
              v-model="title"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md border border-transparent bg-sky-500 py-2 px-4 font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
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
const popup = ref(null);
defineExpose({ openPopup });
function openPopup() {
  popup.value.openPopup();
}

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const title = ref("");

async function addTitle() {
  popup.value.closePopup();

  // TODO: book_titles currently is just a text string containing just the last book read. decide on best way to represent all books read
  const { data, error } = await supabase
    .from("books")
    .insert({
      title: title.value,
    })
    .select();

  console.log(data);

  const added_book_id = data[0].book_id;
  console.log(added_book_id);

  const { books_read_error } = await supabase.from("books_read").insert({
    id: user.value.id,
    book_id: added_book_id,
  });

  // the below code is to just check whether the above updating actually works
  /*const { titles, get_error } = await this.supabase
        .from("profiles")
        .select("book_titles")
        .eq("id", this.user.id);
      console.log(titles);*/
}
</script>
