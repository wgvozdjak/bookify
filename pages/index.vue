<template>
  <div class="flex flex-col items-center">
    <!-- welcome message -->
    <div>hi there! welcome to bookify 👋</div>

    <button @click="openAddBookPopup">add a book</button>
    <AddBookPopup ref="addBookPopup" @bookAdded="bookAdded"></AddBookPopup>

    <!-- main content -->
    <div class="mt-4 flex w-full flex-row gap-4">
      <!-- table of books read -->
      <div class="flex basis-1/2 flex-col">
        <div>
          <div>books read</div>
        </div>
        <BooksTable ref="booksTable"></BooksTable>
      </div>

      <!-- books read graph -->
      <div class="flex basis-1/2 flex-col">
        <div>2022 book chart</div>
        <div>
          <img
            src="https://via.placeholder.com/500x350.png?text=placeholder+for+books+read+graph"
          />
        </div>
      </div>
    </div>

    <!-- other features -->
    <div class="mt-8 flex w-full flex-col">
      <!-- header -->
      <div class="mx-auto">other features</div>

      <!-- buttons -->
      <div class="mb-8 flex w-full flex-row justify-between">
        <NuxtLink
          to="/"
          class="inline-block w-1/5 rounded-2xl border-2 border-solid border-black px-4 py-2"
        >
          data
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mb-[2px] inline h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </NuxtLink>

        <NuxtLink
          to="/"
          class="inline-block w-1/5 rounded-2xl border-2 border-solid border-black px-4 py-2"
        >
          recommendations
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mb-[2px] inline h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </NuxtLink>

        <NuxtLink
          to="/"
          class="inline-block w-1/5 rounded-2xl border-2 border-solid border-black px-4 py-2"
        >
          isbn to goodreads
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mb-[2px] inline h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import AddBookPopup from "../components/home/AddBookPopup.vue";
import BooksTable from "../components/home/BooksTable.vue";

export default {
  data() {
    return {};
  },
  methods: {
    openAddBookPopup() {
      this.$refs.addBookPopup.openPopup();
    },
    bookAdded(val) {
      console.log("a book was added");
      this.$refs.booksTable.addBook(val);
    },
  },
  components: {
    AddBookPopup,
    BooksTable,
  },
};
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
