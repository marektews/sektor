<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { url_buffer_icon } from '@/assets/helper.js'
import ActiveTile from '@/components/ActiveTile.vue'

const router = useRouter()
const buffers = ref([])

onMounted(() => {
    fetch('/api/buffer/all')
    .then((response) => response.json())
    .then((d) => {
        console.log('Fetch buffers:', d)
        buffers.value = d
    })
    .catch((error) => console.error('Fetch buffers error:', error))
})

function onBufferSelected(terminalID, terminalName) {
    // router.push(`/bufor/${terminalName}`)
    router.push({ 
        name: 'bufor', 
        params: { 
            name: terminalName,
        } 
    })
}
</script>

<template>
    <div>
        <header>Wybierz bufor</header>
        <div class="buffers-list">
            <ActiveTile v-for="(item, index) in buffers" :key="index"
                :image-path="url_buffer_icon()"
                @click="onBufferSelected(item.id, item.name)"
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