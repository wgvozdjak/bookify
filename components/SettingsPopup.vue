<template>
  <Transition
    enter-active-class="duration-200 ease-out"
    enter-from-class="transform opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <div v-if="isVisible" class="flex w-full h-full fixed top-0 left-0 justify-center items-center bg-black bg-opacity-20">
      <div class="shadow-xl flex bg-solid bg-white border-2 border-solid border-black w-[425px] rounded-3xl p-4 pb-5">
        <form v-if="!user" @submit.prevent="handleLogin" class="w-full">
          <div class="flex flex-col gap-3 w-full">
            <div class="w-full flex flex-row justify-between">
              <h1 class="font-bold text-xl">bookify settings</h1>
              <button class="text-xl" @click="closePopup">&#x2715;</button>
            </div>
            <!--<p class="description ">Sign in via magic link with your email below</p>-->
            <div class="flex flex-col gap-1 w-full">
              <h2>Sign in with magic link</h2>
              <input
                class="w-full border-2 border-solid border-gray-300 p-1 rounded-md"
                type="email"
                placeholder="Your email"
                v-model="email"
              />
              <div>
                <input
                  type="submit"
                  class="w-full border-2 border-solid border-gray-300 bg-gray-200 rounded-md p-1 text-left cursor-pointer hover:bg-gray-300 active:bg-gray-400 active:border-gray-400"
                  :value="loading ? 'Loading' : 'Send magic link'"
                  :disabled="loading"
                />
              </div>
            </div>
          </div>
        </form>

        <!-- TODO: Convert form into a Vue component -->
        <form v-else class="flex flex-col w-full gap-10" @submit.prevent="updateProfile">

          <div class="w-full flex flex-row justify-between">
            <h1 class="font-bold text-xl">bookify settings</h1>
            <button class="text-xl" @click="closePopup">&#x2715;</button>
          </div>

          <div class="relative">
            <input class="w-full py-2 bg-white border-b-2 focus:border-sky-500 focus:outline-none peer placeholder-transparent" id="email" placeholder="Email" type="text" :value="user.email" disabled />
            <label for="email" class="absolute left-0 -top-3.5 text-sky-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sky-500 peer-focus:text-sm">Email</label>
          </div>
          <div class="relative">
            <input class="w-full py-2 bg-white border-b-2 focus:border-sky-500 focus:outline-none peer placeholder-transparent" id="username" type="text" placeholder="Username" v-model="username" />
            <label for="username" class="absolute left-0 -top-3.5 text-sky-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sky-500 peer-focus:text-sm">Username</label>
          </div>
          <div class="relative">
            <input class="w-full py-2 bg-white border-b-2 focus:border-sky-500 focus:outline-none peer placeholder-transparent" id="website" type="website" placeholder="Website" v-model="website" />
            <label for="website" class="absolute left-0 -top-3.5 text-sky-500 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sky-500 peer-focus:text-sm">Website</label>
          </div>
      
          <div class="flex flex-row w-full gap-4">
              <input
                type="submit"
                class="py-3 basis-1/2 bg-sky-500 rounded-lg justify-center cursor-pointer hover:bg-sky-400 font-bold transition"
                :value="loading ? 'Loading ...' : 'Update'"
                :disabled="loading"
              />

              <button class="py-3 basis-1/2 bg-sky-500 rounded-lg justify-center cursor-pointer hover:bg-sky-400 font-bold transition" @click="signOut" :disabled="loading">
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

  defineExpose({openPopup});

  const supabase = useSupabaseClient()

  const loading = ref(false)
  const email = ref('')
  const handleLogin = async () => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signIn({ email: email.value })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      loading.value = false
    }
  }
</script>
  