<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, } from 'vue-router';
import { url_buffer_icon } from '@/assets/helper.js';
// import { $mqtt } from 'vue-paho-mqtt';
import Close from '../../components/Close.vue';
import BusItem from './BusItem.vue';

// DATA
const data = reactive({
    info: {},
    states: {},
    loading: {
        info: false,
        states: false
    }
})

const route = useRoute()
const timer = ref(null)

onMounted(() => {
    // pobieranie statycznego info
    load_static_info()

    // pobieranie aktualnych stanów
    timer.value = setInterval(() => {
        if(!data.loading.states)
            load_states()
    }, 10000)
    load_states()

    // subskrypcja powiadomień
    // $mqtt.subscribe('events', (payload) => {
    //     payload = payload.replaceAll("'",'"')
    //     console.log('MQTT:', payload, 'received');
    //     let json = JSON.parse(payload)
    //     if(json.rja_id in data.states) {
    //         let u = data.states[json.rja_id]
    //         u.status = json.status
    //         u.ts = json.ts
    //     }
    //     else {
    //         data.states[json.rja_id] = {
    //             status: json.status,
    //             ts: json.ts
    //         }
    //     }
    // })
})

onBeforeUnmount(() => {
    // $mqtt.unsubscribeAll()
    if(timer.value != null) {
        clearInterval(timer.value)
        timer.value = null
    }
})

/**
 * Pobieranie statycznych informacji
 */
function load_static_info() {
    fetch(`/api/buffer/${route.params.tid}`)
    .then(response => {
        // console.log('Fetch buffer info response:', response)
        if(response.status == 200)
            return response.json()
        else
            return {}
    })
    .then(d => {
        console.log('Fetch buffer info:', d)
        data.info = d
    })
    .catch(error => console.error('Fetch buffer info error:', error))
}

/**
 * Pobieranie aktualnych stanów
 */
function load_states() {
    data.loading.states = true

    fetch(`/api/buffer/${route.params.tid}/states`)
    .then(response => {
        data.loading.states = false
        // console.log('Fetch buffer states response:', response)
        if(response.status == 200)
            return response.json()
        else
            return {}
    })
    .then(d => {
        console.log('Fetch buffer states:', d)
        if(d.bid == route.params.tid)
            data.states = d.states
    })
    .catch(error => {
        console.error('Fetch buffer states error:', error)
        data.loading.states = false
    })
}

function apply_notification_response(json) {
    if(json.rja_id in data.states) {
        let u = data.states[json.rja_id]
        u.status = json.status
        u.ts = json.ts
    }
    else {
        data.states[json.rja_id] = {
            status: json.status,
            ts: json.ts
        }
    }    
}
</script>

<template>
    <div v-if="Object.keys(data.info).length == 0" class="loading-layout">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <div>
            Proszę czekać!
        </div>
        <div>Trwa inicjowanie widoku.</div>
        <div>Jeśli trwa to dłużej niż kilkanaście sekund ponownie odśwież stronę.</div>
    </div>

    <template v-else>
        <header>
            <img :src="url_buffer_icon()" width="50" />
            <div>{{ data.info.name }}</div>
            <Close />
        </header>

        <div class="accordion" id="accordionRoot">
            <BusItem v-for="(item, index) in data.info.buses" :key="index"
                :index="index"
                :info="item"
                :state="data.states[item.id]"
                @notification="apply_notification_response"
            />
        </div>
    </template>
</template>

<style scoped>
header {
    position: relative;
    pointer-events: none;
    margin-bottom: 1.5rem;
    font-size: 1.7rem;

    display: flex;
    flex-direction: row;
    gap: 12pt;
    align-items: center;
}

.loading-layout {
    display: flex;
    flex-direction: column;
    gap: 4pt;
    align-items: center;
    text-align: center;
}

</style>