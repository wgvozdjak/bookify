<!-- all the fonts used to be font-josefin -->

<template>
  <header class="bg-red w-full">
    <div class="my-0 mx-auto flex w-full max-w-screen-2xl py-4 px-2">
      <nav class="flex flex-1 items-center">
        <div class="flex">
          <a href="/" class="px-4 py-2 text-xl">bookify.</a>
        </div>
        <div class="relative flex flex-1 justify-end">
          <a href="/" class="px-4 py-2 text-xl">home</a>
          <a href="#" class="px-4 py-2 text-xl">goals</a>
          <a href="#" class="px-4 py-2 text-xl">data</a>
          <a href="#" class="px-4 py-2 text-xl">recommendations</a>
          <button
            href="#"
            class="px-4 py-2 text-xl"
            @click="$emit('settingsClicked')"
          >
            settings
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>
