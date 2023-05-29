<script setup>
import { reactive } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import Close from '../../components/Close.vue';

let data = reactive({ 
    info: {},
})

const route = useRoute()
fetch(`/api/sector/${route.params.sid}`)
.then(response => {
    if(response.status == 200)
        return response.json()
    else
        return {}
})
.then(d => {
    console.log('Fetch sector state:', d)
    data.info = d
})
.catch(error => console.error('Fetch sector state error:', error))

</script>

<template>
    <header>
        <Close />
        <img src="/D15.svg" width="50" />
        <div>
            <h2>{{ data.info.name }}</h2>
            <nav>
                <RouterLink :to="{name: 'stan', params: route.params}">Aktualny stan</RouterLink> |
                <RouterLink :to="{name: 'rozklad', params: route.params}">Rozkład jazdy</RouterLink>
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