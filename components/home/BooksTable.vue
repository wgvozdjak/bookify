<template>
  <div
    class="books-read-table mt-2 flex flex-1 border-separate border-spacing-0 flex-col rounded-2xl border-2 border-solid border-black bg-white shadow-lg"
  >
    <div class="tr">
      <div class="th">date</div>
      <div class="th">title</div>
      <div class="th">author</div>
      <div class="th">rating</div>
      <div class="th">tags</div>
    </div>
    <div class="tr" v-for="book in books_list">
      <div class="td">{{ book.date }}</div>
      <div class="td">{{ book.title }}</div>
      <div class="td">{{ book.author }}</div>
      <div class="td">
        <div class="flex items-center">
          <div v-for="index in 5">
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              v-if="index <= book.rating"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-gray-300 dark:text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              v-else
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div class="td">{{ book.tags }}</div>
    </div>
  </div>
</template>

<script setup>
const books_hardcoded = ref([
  {
    date: "october 22, 2022",
    title: "harry potter 1",
    author: "jk rowling",
    rating: 4,
    tags: "magic, fantasy, fiction",
  },
  {
    date: "october 26, 2022",
    title: "harry potter 2",
    author: "jk rowling",
    rating: 3,
    tags: "magic, fantasy, fiction",
  },
]);

defineExpose({ addBook });

const books_list = ref([]);

const supabase = useSupabaseClient();
const user = useSupabaseUser();

let receivedBooks = false;
if (user.value) {
  getBookList(user.value.id);
} else {
  supabase.auth.onAuthStateChange((event, session) => {
    if (!receivedBooks && event == "SIGNED_IN") {
      const timer = setInterval(async () => {
        const updated_user = useSupabaseUser();
        if (updated_user.value) {
          clearInterval(timer);
          getBookList(updated_user.value.id);
          receivedBooks = true;
        }
      }, 100);
    }
  });
}

async function getBookList(user_id) {
  // TODO: add row-level security that only allows a user to select rows that are attached to their user id
  const { data, error } = await supabase.rpc("list_books_by_user", {
    user_id: user_id,
  });

  for (let book of data) {
    const date = book.book_date;

    // TODO: feels like a hacky way to do this? should the date object be a string object in the first place, or a date datatype?
    const year = parseInt(date.substring(0, 4));
    const month = parseInt(date.substring(5, 7));
    const day = parseInt(date.substring(8, 10));
    const date_parsed = month + "/" + day + "/" + year;

    books_list.value.push({
      date: date_parsed,
      title: book.title,
      author: book.author,
      rating: book.rating,
      tags: "this is a test",
    });
  }
}

function addBook(book_info, book_user_info) {
  const date = book_user_info.date;

  // TODO: feels like a hacky way to do this? should the date object be a string object in the first place, or a date datatype?
  const year = parseInt(date.substring(0, 4));
  const month = parseInt(date.substring(5, 7));
  const day = parseInt(date.substring(8, 10));
  const date_parsed = month + "/" + day + "/" + year;

  books_list.value.push({
    date: date_parsed,
    title: book_info.title,
    author: book_info.author,
    rating: book_user_info.rating,
    tags: "this is a test",
  });
}
</script>

<style>
.books-read-table .td,
.books-read-table .th {
  @apply w-1/5;
  @apply text-left;
  @apply align-top;
  @apply px-3;
  @apply py-2;
}

.books-read-table .td:not(.books-read-table .tr .td:last-child),
.books-read-table .th:not(.books-read-table .tr .th:last-child) {
  @apply border-r-2;
  @apply border-black;
  @apply border-solid;
}

.books-read-table .tr {
  @apply flex;
  @apply flex-row;
}

.books-read-table .th {
  @apply font-bold;
}

.books-read-table .tr:last-child {
  @apply flex-1;
}
</style>
