<template>
  <table
    class="books-read-table mt-2 block h-96 overflow-y-scroll rounded-xl border-2 border-solid border-black bg-white shadow-lg"
  >
    <thead class="sticky top-0 z-0">
      <tr class="bg-white">
        <th>date</th>
        <th>title</th>
        <th>author</th>
        <!--<th>rating</th>-->
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="book in books_list"
        @click="bookClicked(book)"
        class="transition hover:cursor-pointer hover:bg-gray-200"
      >
        <td>{{ book.date }}</td>
        <td>{{ book.title }}</td>
        <td>{{ book.author }}</td>
        <!--<td>{{ book.rating }} / 5</td>-->
      </tr>
    </tbody>
  </table>
</template>

<script setup>
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
      read_id: book.read_id,
    });

    // TODO: implement tags, both backend and frontend
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

function bookClicked(book) {
  const id = book.read_id;
  window.location.href = "book?id=" + id;
}
</script>

<style>
.books-read-table td,
.books-read-table th {
  @apply w-1/3;
  @apply text-left;
  @apply align-top;
  @apply px-3;
  @apply py-2;
}

.books-read-table td:not(.books-read-table tr td:last-child),
.books-read-table th:not(.books-read-table tr th:last-child) {
  @apply border-r-2;
  @apply border-black;
  @apply border-solid;
}

.books-read-table tr {
  @apply flex;
  @apply flex-row;
}

.books-read-table th {
  @apply font-bold;
}

.books-read-table tr:last-child {
  @apply flex-1;
}

.books-read-table::-webkit-scrollbar-thumb {
  width: 10px;
  background: #999999;
  border-radius: 10px;
  background-clip: padding-box;
  border: 4px solid transparent;
}

.books-read-table::-webkit-scrollbar-thumb:hover {
  background: #6b6b6b;
  background-clip: padding-box;
  border: 4px solid transparent;
}

.books-read-table::-webkit-scrollbar {
  width: 16px;
  margin-right: -1px;
  overflow: hidden;
}
</style>
