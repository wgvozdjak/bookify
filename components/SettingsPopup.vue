<template>
  <div class="flex w-full h-full absolute top-0 left-0 justify-center items-center">
    <form class="shadow-xl row flex-center flex bg-solid bg-white border-2 border-solid border-black w-[425px] h-[225px] rounded-3xl p-4" @submit.prevent="handleLogin">
      <div class="col-6 form-widget flex flex-col gap-3 w-full">
        <h1 class="font-bold text-xl">bookify.</h1>
        <!--<p class="description -mt-3">Sign in via magic link with your email below</p>-->
        <input
          class="w-full border-2 border-solid border-gray-300 p-1 rounded-md"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
        <div>
          <input
            type="submit"
            class="w-full border-2 border-solid border-gray-800 bg-gray-200 rounded-md"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
  </div>
</template>
  
<script setup>
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
  