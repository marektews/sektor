<script setup>
import { ref } from 'vue';
import { url_sector_icon } from '@/assets/helper.js'
import ActiveTile from '@/components/ActiveTile.vue'

const terminals = ref([])
fetch('/api/terminal/all')
.then((response) => response.json())
.then((d) => {
    console.log('Fetch terminals:', d)
    terminals.value = d
})
.catch((error) => console.error(error))

const emit = defineEmits(['terminal-selected'])
</script>

<template>
    <div>
        <header>Wybierz terminal</header>
        <div class="terminals-list">
            <ActiveTile v-for="(item, index) in terminals" :key="index"
                :image-path="url_sector_icon()"
                @click="$emit('terminal-selected', item.tid)"
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

.terminals-list {
    display: flex;
    flex-direction: column;
    gap: 12pt;
}
</style>