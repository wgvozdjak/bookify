<!-- all the fonts used to be font-josefin -->

<template>
  <header class="w-full">
    <div class="my-0 mx-auto flex w-full max-w-screen-lg py-4 px-2">
      <nav class="flex flex-1 items-center">
        <div class="flex">
          <a href="/" class="px-4 py-2">bookify.</a>
        </div>
        <div class="relative flex flex-1 justify-end">
          <a href="/" class="px-4 py-2">home</a>
          <a href="/goals" class="px-4 py-2">goals</a>
          <a href="/data" class="px-4 py-2">data</a>
          <!--<a href="#" class="px-4 py-2">recommendations</a>-->
          <button href="#" class="px-4 py-2" @click="$emit('settingsClicked')">
            settings
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>
