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
                    name: 'Dashboard',
                    component: () => import('@paginas/Dashboard.vue')
                },

                {
                    path: '/Menu',
                    name: 'Menu',
                    component: () => import('@paginas/Menu.vue')
                },

                {
                    path: '/Rotinas',
                    name: 'Rotinas',
                    component: () => import('@paginas/Rotinas.vue')
                },

                {
                    path: '/Nacionalidade',
                    name: 'Nacionalidade',
                    component: () => import('@paginas/Nacionalidade.vue')
                },

                {
                    path: '/Vinculos',
                    name: 'Vinculos',
                    component: () => import('@paginas/Vinculos.vue')
                },

                {
                    path: '/TipoFormacao',
                    name: 'TipoFormacao',
                    component: () => import('@paginas/TipoFormacao.vue')
                },
                
                {
                    path: '/Jurisdicoes',
                    name: 'Jurisdicoes',
                    component: () => import('@paginas/Jurisdicoes.vue')
                },

                {
                    path: '/Cbos',
                    name: 'Cbos',
                    component: () => import('@paginas/Cbos.vue')
                },

                {
                    path: '/GruposMatricula',
                    name: 'GruposMatricula',
                    component: () => import('@paginas/GruposMatricula.vue')
                },
                
                {
                    path: '/TipoCargos',
                    name: 'TipoCargos',
                    component: () => import('@paginas/TipoCargos.vue')
                }, 
                
                {
                    path: '/Traducao',
                    name: 'Traducao',
                    component: () => import('@paginas/Traducao.vue')
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
