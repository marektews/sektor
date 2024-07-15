<script setup>
import { ref } from 'vue'
import StartMenu from './StartMenu.vue'
import BuffersGroup from './BuffersGroup.vue'
import TerminalsGroup from './TerminalsGroup.vue'
import SectorsGroup from './SectorsGroup.vue'

const mode = ref(0)
const tid = ref(undefined)

</script>

<template>
    <main>
        <StartMenu v-if="mode === 0" 
            @buffers="mode = 10"
            @terminals="mode = 20"
        />

        <BuffersGroup v-else-if="mode === 10" />
        
        <TerminalsGroup v-else-if="mode === 20"
            @terminal-selected="$event => {tid = $event; mode = 21}" 
        />
        
        <SectorsGroup v-else-if="mode === 21"
            :terminal-id="tid"
            @back="mode = 20"
        />
    </main>
</template>