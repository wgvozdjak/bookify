<template>
  <div class="flex flex-col items-center">
    <AddBookPopup ref="addBookPopup" @bookAdded="bookAdded"></AddBookPopup>

    <!-- welcome message -->
    <div class="mt-4 text-2xl font-bold">hi there! welcome to bookify 👋</div>

    <!-- main content -->
    <div id="main" class="mt-8 flex w-full flex-row gap-4">
      <!-- table of books read -->
      <div class="flex basis-1/2 flex-col">
        <div>
          <div class="inline-block font-bold">books read</div>
          <button @click="openAddBookPopup" class="ml-4 inline-block">
            add a book
          </button>
        </div>
        <BooksTable ref="booksTable"></BooksTable>
      </div>

      <!-- books read graph -->
      <div class="flex basis-1/2 flex-col">
        <div class="font-bold">2022 book chart</div>
        <div>
          <img
            src="https://via.placeholder.com/550x350.png?text=placeholder+for+books+read+graph"
            class="mt-2 w-full rounded-2xl border-2 border-solid border-black shadow-lg"
          />
        </div>
      </div>
    </div>

    <!-- other features -->
    <div class="mt-8 flex w-full flex-col">
      <!-- header -->
      <div class="mx-auto mb-6">other features</div>

      <!-- buttons -->
      <div class="mx-auto mb-8 flex flex-row gap-4">
        <!-- transition-all duration-100 hover:mb-2 hover:-mt-1 -->
        <NuxtLink
          to="/"
          class="mt-0 inline-block w-60 rounded-2xl border-2 border-solid border-black bg-white px-4 py-2 shadow-md"
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
          class="inline-block w-60 rounded-2xl border-2 border-solid border-black px-4 py-2 shadow-md"
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
          class="inline-block w-60 rounded-2xl border-2 border-solid border-black px-4 py-2 shadow-md"
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
    bookAdded(book_info, book_user_info) {
      this.$refs.booksTable.addBook(book_info, book_user_info);
    },
  },
  components: {
    AddBookPopup,
    BooksTable,
  },
};
</script>
