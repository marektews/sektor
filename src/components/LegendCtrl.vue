<template>
    <div class="card">
        <div class="card-body">
            <div class="card-title">LEGENDA</div>
            <div class="legend-grid">
                <StatusLed status="no-bus" />
                <div>- brak autokaru</div>
                <StatusLed status="in-buffer" />
                <div>- postój w buforze</div>
                <StatusLed status="second-circle" />
                <div>- kołowanie, za wczesny przyjazd</div>
                <StatusLed status="send-to-sector" />
                <div>- podstawianie na sektor</div>
                <StatusLed status="on-sector" />
                <div>- postój na sektorze</div>
                <StatusLed status="ready-to-leave" />
                <div>- gotowy do odjazdu</div>
                <StatusLed status="on-the-road" />
                <div>- w trasie</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import StatusLed from '@/components/StatusLed.vue'
</script>

<style scoped>
.legend-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2pt 6pt;
}
</style>