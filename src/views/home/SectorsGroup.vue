<script setup>
import { ref } from 'vue'
import { url_sector_icon } from '@/assets/helper.js'
import router from '@/router'
import Back from '@/components/BackButton.vue'
import ActiveTile from '@/components/ActiveTile.vue'

const props = defineProps(['terminalId'])
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
function on_ItemClicked(sid) {
    router.push({
        name: "sektor",
        params: { sid: sid }
    })
}
</script>

<template>
    <div>
        <header>
            <Back @click="on_BackClicked" />
            <div>Wybierz sektor</div>
        </header>
        <div class="sectors-list">
            <ActiveTile v-for="(item, index) in terminal.sectors" :key="index"
                :image-path="url_sector_icon()"
                @click="on_ItemClicked(item.sid)"
            >
                {{ item.name.replace('x','') }}
            </ActiveTile>
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