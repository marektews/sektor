<script setup>
import { ref } from 'vue';
import TerminalTile from '@/components/TerminalTile.vue'

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
            <TerminalTile v-for="(item, index) in terminals" :key="index" 
                :terminal="item"
                @click="$event => emit('terminal-selected', $event)"
            />
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