<script setup>
import { ref, reactive, watch } from 'vue'
import Tile from '../components/Tile.vue'

const data = reactive({
    count: 0,
    tiles: [],
})
watch(data.count, (n) => console.log('Watcher of count:', n))
watch(data.tiles, (n) => console.log('Watcher of tiles:', n))

fetch('/api/init')
.then((response) => response.json())
.then((d) => {
    console.log('Fetch:', d)
    data.tiles = d
    data.count = 10
})
.catch((error) => console.error(error))
</script>

<template>
    <header>
        Wybierz stanowisko
    </header>
    <main>
        <Tile v-for="(item, index) in data.tiles" :key="index" 
            :title="item.title" 
            :bufor="item.buffer"
        />
    </main>
</template>

<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
}

main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1.5rem;
}
</style>