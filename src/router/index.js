import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkExactActiveClass: 'exact-active-link',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home/HomeView.vue')
        },
        {
            path: '/bufor/:tid',
            name: 'bufor',
            component: () => import('../views/buffer/BuforView.vue'),
        },
        {
            path: '/sektor/:sid',
            name: 'sektor',
            component: () => import('../views/sector/SectorView.vue'),
        }
    ]
})

export default router
