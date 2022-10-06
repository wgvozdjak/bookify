<template>
    <div class="mx-auto min-h-screen justify-start flex flex-col">
        <NavigationBar />
        <div class="w-full px-6 max-w-screen-2xl mx-auto"><slot /></div>
        <Footer class="mt-auto" />
    </div>
</template>

<script>
    import Footer from '../components/Footer.vue'
    import NavigationBar from '../components/NavigationBar.vue'

    export default {
        components: {
            NavigationBar,
            Footer
        }
    }
</script>
