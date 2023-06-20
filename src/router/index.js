import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkExactActiveClass: 'exact-active-link',
    routes: [
        {
            path: '/',
            name: 'home',
            // route level code-splitting
            // this generates a separate chunk (HomeView.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
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
            children: [
                {
                    path: "",
                    name: "stan",
                    component: () => import('../views/sector/SectorWorkflowFragment.vue')
                },
                {
                    path: "rozklad",
                    name: "rozklad",
                    component: () => import('../views/sector/SectorScheduleFragment.vue')
                }
            ]
        }
    ]
})

export default router
