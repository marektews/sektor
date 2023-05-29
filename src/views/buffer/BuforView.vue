<script setup>
import { reactive } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import Close from '../../components/Close.vue';

let data = reactive({ 
    info: {},
})

const route = useRoute()
fetch(`/api/buffer/${route.params.tid}`)
.then(response => {
    if(response.status == 200)
        return response.json()
    else
        return {}
})
.then(d => {
    console.log('Fetch buffer state:', d)
    data.info = d
})
.catch(error => console.error('Fetch buffer state error:', error))
</script>

<template>
    <header>
        <Close />
        <img src="/B20.svg" width="50" />
        <div>
            <h2>Bufor</h2>
            <nav>
                <RouterLink :to="{name: 'bufor_stan', params: route.params}">Przyjazdy</RouterLink> |
                <RouterLink :to="{name: 'bufor_rozklad', params: route.params}">Podstawienia</RouterLink>
            </nav>
        </div>
    </header>
    <RouterView />
</template>

<style scoped>
header {
    position: relative;
    pointer-events: none;
    margin-bottom: 1rem;    

    display: flex;
    flex-direction: row;
    gap: 12pt;
    align-items: center;
}

nav {
    display: flex;
    flex-direction: row;
    gap: 12pt;
    pointer-events: auto;
}
</style>