<script setup>
import { reactive } from 'vue'
import Terminals from '../components/Terminals.vue'
import Sectors from '../components/Sectors.vue'

const data = reactive({
    tid: undefined,
})

</script>

<template>
    <main>
        <Terminals v-if="data.tid === undefined"
            @terminal-selected="$event => data.tid = $event" 
        />
        <Sectors v-else 
            :terminal-id="data.tid"
            @back="data.tid = undefined"
        />
    </main>
</template>