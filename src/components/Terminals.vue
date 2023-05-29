<script setup>
import { reactive } from 'vue';
import TerminalTile from '@/components/TerminalTile.vue'

let data = reactive({ 
    terminals: [],
})

fetch('/api/terminal/all')
.then((response) => response.json())
.then((d) => {
    console.log('Fetch terminals:', d)
    data.terminals = d
})
.catch((error) => console.error(error))

const emit = defineEmits(['terminal-selected'])
</script>

<template>
    <div>
        <header>Wybierz terminal</header>
        <div class="terminals-list">
            <TerminalTile v-for="(item, index) in data.terminals" :key="index" 
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