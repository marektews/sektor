<script setup>
import { ref } from 'vue'
import SectorTile from './SectorTile.vue'
import Back from './Back.vue';

const props = defineProps({
    terminalId: String,
})

const terminal = ref({})

fetch(`/api/terminal/${props.terminalId}`)
.then((response) => response.json())
.then((d) => {
    console.log('Fetch full info of selected terminal:', d)
    terminal.value = d
})
.catch((error) => console.error(error))

const emit = defineEmits(['back'])
function on_BackClicked() {
    console.log('back')
    emit('back')
}
</script>

<template>
    <div>
        <header>
            <Back @click="on_BackClicked" />
            <div>Wybierz sektor</div>
        </header>
        <div class="sectors-list">
            <SectorTile v-for="(item, index) in terminal.sectors" :key="index" 
                :sector="item"
            />
        </div>
    </div>
</template>

<style scoped>
header {
    margin-bottom: 1.9rem;
    font-size: 1.4rem;
    text-align: center;
    position: relative;
    pointer-events: none;
}

.sectors-list {
    min-width: 250px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6pt;
}
</style>