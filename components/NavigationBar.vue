<template>
    <header class="w-full bg-red">
        <div class="flex my-0 mx-auto py-4 max-w-screen-2xl w-full px-2">
            <nav class="items-center flex flex-1">
                <div class="flex">
                    <a href="/" class="px-4 py-2 text-2xl text-slate-900 font-josefin">bookify.</a>
                </div>
                <div class="flex flex-1 justify-end relative">
                    <a href="/" class="px-4 py-2 text-2xl text-slate-900 font-josefin">home</a>
                    <a href="#" class="px-4 py-2 text-2xl text-slate-900 font-josefin">goals</a>
                    <a href="#" class="px-4 py-2 text-2xl text-slate-900 font-josefin">data</a>
                    <a href="#" class="px-4 py-2 text-2xl text-slate-900 font-josefin">recommendations</a>
                    <button href="#" class="px-4 py-2 text-2xl text-slate-900 font-josefin" @click="$emit('settingsClicked')">settings</button>
                </div>
            </nav>
        </div>
    </header>
</template>
