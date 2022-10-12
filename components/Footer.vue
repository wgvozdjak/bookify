<template>
  <footer class="bg-gray-400 w-full">
    <div
      class="max-w-screen-2xl px-6 flex flex-1 flex-row mx-auto py-10 font-josefin text-lg"
    >
      <div class="basis-1/2">
        <h1 class="text-2xl mb-3 font-bold">bookify.</h1>
        <p>By William Gvozdjak.<br />Created with NuxtJS and TailwindCSS.</p>
      </div>
      <div class="ml-7 basis-1/2">
        <table class="w-full text-left">
          <tr>
            <th>features</th>
            <th>account</th>
          </tr>
          <tr>
            <td><NuxtLink to="#">home</NuxtLink></td>
            <td><NuxtLink to="#">sign in</NuxtLink></td>
          </tr>
          <tr>
            <td><NuxtLink to="#">goals</NuxtLink></td>
            <td></td>
          </tr>
          <tr>
            <td><NuxtLink to="#">data</NuxtLink></td>
            <td></td>
          </tr>
          <tr>
            <td><NuxtLink to="#">recommendations</NuxtLink></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </footer>
</template>

<style>
@import url("../assets/global.css");

th {
  @apply w-1/2;
}
</style>
