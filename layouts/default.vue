<template>
    <div class="mx-auto min-h-screen justify-start flex flex-col">
        <NavigationBar @settings-clicked="openSettings"/>
        <div class="w-full px-6 max-w-screen-2xl mx-auto"><slot /></div>
        <Footer class="mt-auto" />
        <SettingsPopup ref="settingsPopup"/>
    </div>
</template>

<script>
    import Footer from '../components/Footer.vue'
    import NavigationBar from '../components/NavigationBar.vue'
    import SettingsPopup from '../components/SettingsPopup.vue'

    export default {
        components: {
            NavigationBar,
            Footer,
            SettingsPopup
        },
        methods: {
            openSettings() {
                this.$refs.settingsPopup.openPopup();
            }
        }
    }
</script>
