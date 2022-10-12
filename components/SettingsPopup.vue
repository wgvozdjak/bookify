<template>
  <Transition
    enter-active-class="duration-200 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-20"
    >
      <div
        class="bg-solid flex w-[425px] rounded-3xl border-2 border-solid border-black bg-white p-4 pb-5 shadow-xl"
      >
        <form v-if="!user" @submit.prevent="handleLogin" class="w-full">
          <div class="flex w-full flex-col gap-3">
            <div class="flex w-full flex-row justify-between">
              <h1 class="text-xl font-bold">bookify settings</h1>
              <button class="text-xl" @click="closePopup">&#x2715;</button>
            </div>
            <!--<p class="description ">Sign in via magic link with your email below</p>-->
            <div class="flex w-full flex-col gap-1">
              <h2>Sign in with magic link</h2>
              <input
                class="w-full rounded-md border-2 border-solid border-gray-300 p-1"
                type="email"
                placeholder="Your email"
                v-model="email"
              />
              <div>
                <input
                  type="submit"
                  class="w-full cursor-pointer rounded-md border-2 border-solid border-gray-300 bg-gray-200 p-1 text-left hover:bg-gray-300 active:border-gray-400 active:bg-gray-400"
                  :value="loading ? 'Loading' : 'Send magic link'"
                  :disabled="loading"
                />
              </div>
            </div>
          </div>
        </form>

        <!-- TODO: Convert form into a Vue component -->
        <!-- TODO: Migrate to use @tailwindcss/forms -->
        <form
          v-else
          class="flex w-full flex-col gap-10"
          @submit.prevent="updateProfile"
        >
          <div class="flex w-full flex-row justify-between">
            <h1 class="text-xl font-bold">bookify settings</h1>
            <button class="text-xl" @click="closePopup">&#x2715;</button>
          </div>

          <div class="relative">
            <input
              class="peer w-full border-b-2 bg-white py-2 placeholder-transparent focus:border-sky-500 focus:outline-none"
              id="email"
              placeholder="Email"
              type="text"
              :value="user.email"
              disabled
            />
            <label
              for="email"
              class="absolute left-0 -top-3.5 cursor-text text-sm text-sky-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-sky-500"
              >Email</label
            >
          </div>
          <div class="relative">
            <input
              class="peer w-full border-b-2 bg-white py-2 placeholder-transparent focus:border-sky-500 focus:outline-none"
              id="username"
              type="text"
              placeholder="Username"
              v-model="username"
            />
            <label
              for="username"
              class="absolute left-0 -top-3.5 cursor-text text-sm text-sky-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-sky-500"
              >Username</label
            >
          </div>
          <div class="relative">
            <input
              class="peer w-full border-b-2 bg-white py-2 placeholder-transparent focus:border-sky-500 focus:outline-none"
              id="website"
              type="website"
              placeholder="Website"
              v-model="website"
            />
            <label
              for="website"
              class="absolute left-0 -top-3.5 cursor-text text-sm text-sky-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-sky-500"
              >Website</label
            >
          </div>

          <div class="flex w-full flex-row gap-4">
            <input
              type="submit"
              class="basis-1/2 cursor-pointer justify-center rounded-lg bg-sky-500 py-2 font-semibold transition hover:bg-sky-400"
              :value="loading ? 'Loading ...' : 'Update'"
              :disabled="loading"
            />

            <button
              class="basis-1/2 cursor-pointer justify-center rounded-lg bg-sky-500 py-2 font-semibold transition hover:bg-sky-400"
              @click="signOut"
              :disabled="loading"
            >
              Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const user = useSupabaseUser();

let isVisible = ref(false);
function closePopup() {
  isVisible.value = false;
}
function openPopup() {
  isVisible.value = true;
}

defineExpose({ openPopup });

const supabase = useSupabaseClient();

const loading = ref(false);
const email = ref("");
const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signIn({ email: email.value });
    if (error) throw error;
    alert("Check your email for the login link!");
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
};
</script>
