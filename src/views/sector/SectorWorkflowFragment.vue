<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import FButton from '../../components/FButton.vue';

const data = reactive({
    states: []
})

const route = useRoute()
fetch(`/api/sector/${route.params.sid}/state`)
.then(response => {
    if(response.status == 200)
        return response.json()
    else
        return []
})
.then(d => {
    console.log('Fetch sector state:', d)
    data.states = d
    data.states.sort((a,b) => difference(b.schedule.departure, a.schedule.departure))
})
.catch(error => console.error('Fetch sector state error:', error))

/**
 * Wyznaczenie różnicy w sekundach
 * @param {Czas wg rozkładu} sched 
 * @param {Czas rzeczywisty} real 
 */
const difference = (sched, real) => {
    if(sched.length === 0 || real.length === 0) return undefined
    const prefix = "1970-01-01T"
    let date_sched = new Date(prefix + sched)
    let date_real = new Date(prefix + real)
    return (date_real.getTime() - date_sched.getTime()) / 1000
}

const format = (diff) => {
    if(diff === undefined) return ""
    if(diff === 0) return "0"
    let sign = (diff < 0) ? '-' : '+'
    let sec = Math.abs(diff)
    if(sec > 59) {
        let m = Intl.NumberFormat(undefined, {
            style: "decimal",
        }).format(sec/60)
        let s = Intl.NumberFormat(undefined, {
            style: "decimal",
            signDisplay: "exceptZero",
            minimumIntegerDigits: 2,
        }).format(sec%60)
        return `${sign} ${m}:${s}`
    }
    return `${sign} ${sec}`
}

const ornament = (diff) => {
    if(diff === undefined || diff === 0) return ""
    return (diff < 0) ? "hurried" : "delayed"
}
</script>

<template>
    <table>
        <thead>
            <tr>
                <th scope="col" rowspan="2">Nazwa zboru</th>
                <th scope="col" colspan="2">Podstawienie</th>
                <th scope="col" colspan="2">Odjazd</th>
            </tr>
            <tr>
                <th>rozkład</th>
                <th>+ / -</th>
                <th>rozkład</th>
                <th>+ / -</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(item, index) in data.states" :key="index">
                <tr>
                    <td>{{ item.congregation }}</td>
                    <td>{{ item.schedule.substitution }}</td>
                    <td :class="ornament(difference(item.schedule.substitution, item.real.substitution))">
                        {{ format(difference(item.schedule.substitution, item.real.substitution)) }}
                    </td>
                    <td>{{ item.schedule.departure }}</td>
                    <td :class="ornament(difference(item.schedule.departure, item.real.departure))">
                        {{ format(difference(item.schedule.departure, item.real.departure)) }}
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
    <!-- Przyciski funkcyjne -->
    <div class="function-buttons">
        <FButton>Przyjazd autokaru</FButton>
        <FButton>Odjazd autokaru</FButton>
        <FButton>Stanowisko puste</FButton>
    </div>
</template>

<style scoped>
table {
    width: 100%;
    font-size: 8pt;
    border-spacing: 0;
    text-align: center;
}

table, th, td {
    border: 1px solid var(--color-border);
}

.hurried {
    color: green;
}

.delayed {
    color: red;
}

.function-buttons {
    margin: 6pt;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2pt;
    justify-content: space-around;
}
</style>