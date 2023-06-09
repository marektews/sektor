<script setup>
import { ref } from 'vue'
import Terminals from '../components/Terminals.vue'
import Sectors from '../components/Sectors.vue'

const tid = ref(undefined)

</script>

<template>
    <main>
        <Terminals v-if="tid === undefined"
            @terminal-selected="$event => tid = $event" 
        />
        <Sectors v-else 
            :terminal-id="tid"
            @back="tid = undefined"
        />
    </main>
</template>