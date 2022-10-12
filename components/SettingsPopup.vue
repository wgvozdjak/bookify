<template>
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

      <form v-else>
        you are signed in.
      </form>
    </div>
  </div>
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
  