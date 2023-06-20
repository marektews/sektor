<script setup>
import { ref } from 'vue'
import StartMenu from './StartMenu.vue'
import Buffers from './Buffers.vue'
import Terminals from './Terminals.vue'
import Sectors from './Sectors.vue'

const mode = ref(0)
const tid = ref(undefined)

</script>

<template>
    <main>
        <StartMenu v-if="mode === 0" 
            @buffers="mode = 10"
            @terminals="mode = 20"
        />

        <Buffers v-else-if="mode === 10" />
        
        <Terminals v-else-if="mode === 20"
            @terminal-selected="$event => {tid = $event; mode = 21}" 
        />
        
        <Sectors v-else-if="mode === 21"
            :terminal-id="tid"
            @back="mode = 20"
        />
    </main>
</template>