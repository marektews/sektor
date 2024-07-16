<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCircleQuestion, faBus, faArrowRotateRight, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import StatusLed from '@/components/StatusLed.vue'

const props = defineProps(['index', 'info', 'state', 'sectorUsed'])
const emit = defineEmits(['notification'])

const congregation_name = computed(() => {
    if(props.info?.sra.lp != null)
        return `${props.info?.congregation.lang} - ${props.info?.congregation.name} ${props.info?.sra.lp}`
    else
        return `${props.info?.congregation.lang} - ${props.info?.congregation.name}`
})

const sector_name = computed(() => props.info?.sector.name)

const showBtnsGroup = computed(() => {
    let s = props.state?.status
    return s === undefined || s === 'no-bus' || s === 'in-buffer' || s === 'second-circle' || s === 'send-to-sector' 
})

const status = computed(() => {
    return props.state ? props.state.status : 'no-bus'
})

/**
 * Brak autobusu w buforze
 * @param {*} info 
 */
function onNoBus(info) {
    fetch(`/api/buffer/notify/nobus/${info.id}`)
    .then(response => response.json())
    .then(d => {
        // console.log('BUFFER: NOBUS notification:', d)
        emit('notification', d)
    })
    .catch(err => console.error("BUFFER: NOBUS notification error:", err))
}

/**
 * Przyjazd busa do bufora
 * @param {*} info 
 */
function onArriveToBuffer(info) {
    fetch(`/api/buffer/notify/inbuffer/${info.id}`)
    .then(response => response.json())
    .then(d => {
        // console.log('BUFFER: IN-BUFFER notification:', d)
        emit('notification', d)
    })
    .catch(err => console.error("BUFFER: IN-BUFFER notification error:", err))
}

/**
 * Wysłanie na drugi krąg - brak miejsca w buforze lub za wczesny przyjazd
 * @param {*} info 
 */
function onSecondCircle(info) {
    fetch(`/api/buffer/notify/secondcircle/${info.id}`)
    .then(response => response.json())
    .then(d => {
        // console.log('BUFFER: SECOND-CIRCLE notification:', d)
        emit('notification', d)
    })
    .catch(err => console.error("BUFFER: SECOND-CIRCLE notification error:", err))
}

/**
 * Podstawianie na sektor
 * @param {*} info 
 */
function onSendToSector(info) {
    fetch(`/api/buffer/notify/sendtosector/${info.id}`)
    .then(response => response.json())
    .then(d => {
        // console.log('BUFFER: SEND-TO-SECTOR notification:', d)
        emit('notification', d)
    })
    .catch(err => console.error("BUFFER: SEND-TO-SECTOR notification error:", err))
}

function format_state(state) {
    if(state != undefined) {
        switch(state.status) {
            case 'in-buffer': return "w buforze"
            case 'second-circle': return "dodatkowy krąg"
            case 'send-to-sector': return "wysłany na sektor"
            case 'on-sector': return "na sektorze"
            case 'ready-to-leave': return "gotowy do odjazdu"
            case 'on-the-road': return "w trasie"
        }
    }
    return "brak"
}
</script>

<template>
    <div class="accordion-item">
        <div class="accordion-header">
            <button 
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse" 
                :data-bs-target="`#collapse${index}`"
                aria-expanded="false" 
                :aria-controls="`collapse${index}`"
            >
                <div class="buffer-item-body" :class="{'text-muted' : status==='on-the-road'}">
                    <template v-if="status==='on-the-road'">
                        <span>{{ info.arrive }}</span>
                        <StatusLed :status="status" />
                        <span>{{ sector_name }}</span>
                        <span>{{ congregation_name }}</span>
                    </template>
                    <template v-else>
                        <strong>{{ info.arrive }}</strong>
                        <StatusLed :status="props.state ? props.state.status : 'no-bus'" />
                        <strong>{{ sector_name }}</strong>
                        <strong>{{ congregation_name }}</strong>
                    </template>
                </div>
            </button>
        </div>
        <div class="accordion-collapse collapse" :id="`collapse${index}`" data-bs-parent="#accordionRoot">
            <div class="collapse-layout">
                <div class="states-layout">
                    <div>Planowy odjazd: <strong>{{ info?.departure }}</strong></div>
                    <div>
                        Status: <strong>{{ format_state(props.state) }}</strong>
                        <small class="ms-2">{{ props.state?.ts }}</small>
                    </div>
                </div>
                <div v-if="showBtnsGroup" class="btn-group">
                    <button 
                        class="btn btn-danger"
                        :disabled="props.state?.status === 'no-bus'"
                        @click="onNoBus(info)"
                    >
                        <FontAwesomeIcon :icon="faCircleQuestion" />
                        <div>Brak</div>
                    </button>
                    <button
                        class="btn btn-primary"
                        :disabled="props.state?.status === 'in-buffer'"
                        @click="onArriveToBuffer(info)"
                    >
                        <FontAwesomeIcon :icon="faBus" />
                        <div>W buforze</div>
                    </button>
                    <button 
                        class="btn btn-warning"
                        :disabled="props.state?.status === 'second-circle'"
                        @click="onSecondCircle(info)"
                    >
                        <FontAwesomeIcon :icon="faArrowRotateRight" />
                        <div>Drugi krąg</div>
                    </button>
                    <button 
                        class="btn btn-success"
                        :disabled="props.state?.status === 'send-to-sector' || props.sectorUsed"
                        @click="onSendToSector(info)"
                    >
                        <FontAwesomeIcon :icon="faPaperPlane" />
                        <div>Na sektor</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.buffer-item-body {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4%;
    align-items: center;
    justify-content: start;
}

.collapse-layout {
    margin: 4pt 0;
    display: flex;
    flex-direction: column;
    gap: 4pt;
    align-items: center;
    justify-content: center;
}

.states-layout {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 1pt 12pt;
    justify-content: center;
    align-items: center;
}
</style>