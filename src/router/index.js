import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/pages/Dashboard.vue')
                },

                {
                    path: '/TipoFormacao',
                    name: 'TipoFormacao',
                    component: () => import('@/views/cadastros/TipoFormacao.vue')
                }, 

                {
                    path: '/Cbos',
                    name: 'Cbos',
                    component: () => import('@/views/cadastros/Cbos.vue')
                },
                
                {
                    path: '/TipoCargos',
                    name: 'TipoCargos',
                    component: () => import('@/views/cadastros/TipoCargos.vue')
                }, 
                
                {
                    path: '/Traducao',
                    name: 'Traducao',
                    component: () => import('@/views/sistema/Traducao.vue')
                },
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
