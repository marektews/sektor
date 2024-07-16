<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperPlane, faSquareParking, faBell, faRoute } from '@fortawesome/free-solid-svg-icons';
import StatusLed from '@/components/StatusLed.vue'

const props = defineProps(['index', 'info', 'state'])
const emit = defineEmits(['notification'])

const congregation_name = computed(() => {
    if(props.info?.sra.lp != null)
        return `${props.info?.congregation.lang} - ${props.info?.congregation.name} ${props.info?.sra.lp}`
    else
        return `${props.info?.congregation.lang} - ${props.info?.congregation.name}`
})

const showBtnsGroup = computed(() => {
    let s = props.state?.status
    return s != undefined   //TODO: skończyć warunek
})

const showBtnError = computed(() => {
    let s = props.state?.status
    return s === 'on-sector'
})

const showBtnOnSector = computed(() => {
    let s = props.state?.status
    return s === 'send-to-sector'
})

const showBtnReadyToLeave = computed(() => {
    let s = props.state?.status
    return s === 'on-sector'
})

const showBtnError2 = computed(() => {
    let s = props.state?.status
    return s === 'ready-to-leave'
})

const showBtnOnTheRoad = computed(() => {
    let s = props.state?.status
    return s === 'on-sector' || s === 'ready-to-leave'
})

const status = computed(() => {
    return props.state ? props.state.status : 'no-bus'
})

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

/**
 * Podstawianie na sektor
 * @param {*} info 
 */
 function onSendToSector(info) {
    fetch(`/api/sector/notify/sendtosector/${info.id}`)
    .then(response => response.json())
    .then(d => {
        // console.log('SECTOR: SEND-TO-SECTOR notification:', d)
        emit('notification', d)
    })
    .catch(err => console.error("SECTOR: SEND-TO-SECTOR notification error:", err))
}

function onReadyToLeave(info) {
    fetch(`/api/sector/notify/readytoleave/${info.id}`)
    .then(response => response.json())
    .then(d => {
        // console.log('SECTOR: READY-TO-LEAVE notification:', d)
        emit('notification', d)
    })
    .catch(err => console.error("SECTOR: READY-TO-LEAVE notification error:", err))
}

/**
 * Przyjazd na sektor
 * @param {*} info 
 */
 function onOnSector(info) {
    fetch(`/api/sector/notify/onsector/${info.id}`)
    .then(response => response.json())
    .then(d => {
        // console.log('SECTOR: ON-SECTOR notification:', d)
        emit('notification', d)
    })
    .catch(err => console.error("SECTOR: ON-SECTOR notification error:", err))
}

/**
 * Przyjazd na sektor
 * @param {*} info 
 */
 function onOnTheRoad(info) {
    fetch(`/api/sector/notify/ontheroad/${info.id}`)
    .then(response => response.json())
    .then(d => {
        // console.log('SECTOR: ON-THE_ROAD notification:', d)
        emit('notification', d)
    })
    .catch(err => console.error("SECTOR: ON-THE_ROAD notification error:", err))
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
                <div class="sector-item-body" :class="{'text-muted' : status==='on-the-road'}">
                    <template v-if="status==='on-the-road'">
                        <span>{{ info.departure }}</span>
                        <StatusLed :status="status" />
                        <span>{{ congregation_name }}</span>
                    </template>
                    <template v-else>
                        <strong>{{ info.departure }}</strong>
                        <StatusLed :status="status" />
                        <strong>{{ congregation_name }}</strong>
                    </template>
                </div>
            </button>
        </div>
        <div class="accordion-collapse collapse" :id="`collapse${index}`" data-bs-parent="#accordionRoot">
            <div class="collapse-layout">
                <div class="states-layout">
                    <div>Planowe podstawienie na sektor: <strong>{{ info?.arrive }}</strong></div>
                    <div>
                        Status: <strong>{{ format_state(props.state) }}</strong>
                        <small class="ms-2">{{ props.state?.ts }}</small>
                    </div>
                </div>
                <div v-if="showBtnsGroup" class="btn-group">
                    <button v-if="showBtnError"
                        class="btn btn-primary"
                        @click="onSendToSector(info)"
                    >
                        <FontAwesomeIcon :icon="faPaperPlane" />
                        <div>Pomyłka - wciąż czekam</div>
                    </button>

                    <button v-if="showBtnError2"
                        class="btn btn-danger"
                        @click="onOnSector(info)"
                    >
                        <FontAwesomeIcon :icon="faSquareParking" />
                        <div>Pomyłka - wciąż na sektorze</div>
                    </button>

                    <button v-if="showBtnOnSector"
                        class="btn btn-danger"
                        @click="onOnSector(info)"
                    >
                        <FontAwesomeIcon :icon="faSquareParking" />
                        <div>Przyjazd na sektor</div>
                    </button>

                    <button v-if="showBtnReadyToLeave"
                        class="btn btn-warning"
                        @click="onReadyToLeave(info)"
                    >
                        <FontAwesomeIcon :icon="faBell" />
                        <div>Gotowy do odjazdu</div>
                    </button>
                    <button v-if="showBtnOnTheRoad"
                        class="btn btn-success"
                        @click="onOnTheRoad(info)"
                    >
                        <FontAwesomeIcon :icon="faRoute" />
                        <div>Odjazd autokaru</div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sector-item-body {
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