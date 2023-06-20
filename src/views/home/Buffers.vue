<script setup>
import { ref } from 'vue'
import router from '@/router'
import { url_buffer_icon } from '@/assets/helper.js'
import ActiveTile from '@/components/ActiveTile.vue'

const buffers = ref([])
fetch('/api/buffer/all')
.then((response) => response.json())
.then((d) => {
    console.log('Fetch buffers:', d)
    buffers.value = d
})
.catch((error) => console.error('Fetch buffers error:', error))

function onBufferSelected(item) {
    router.push({
        name: "bufor",
        params: { tid: item.tid }
    })
}
</script>

<template>
    <div>
        <header>Wybierz bufor</header>
        <div class="buffers-list">
            <ActiveTile v-for="(item, index) in buffers" :key="index"
                :image-path="url_buffer_icon()"
                @click="onBufferSelected(item)"
            >
                {{ item.name }}
            </ActiveTile>
        </div>
    </div>
</template>

<style scoped>
header {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
}

.buffers-list {
    display: flex;
    flex-direction: column;
    gap: 12pt;
}
</style>