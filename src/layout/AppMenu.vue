<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Consultas',
        items: [{ label: 'Dashboard', icon: 'pi pi-chart-line', to: '/' }]
    },
    {
        label: 'Catastros',
        items: [
            { label: 'Cbos',            icon: 'pi pi-book', to: '/Cbos'},
            { label: 'TipoCargos',      icon: 'pi pi-book', to: '/TipoCargos'},
            { label: 'TipoFormacao',    icon: 'pi pi-book', to: '/TipoFormacao'},
        ]
    }, 
    {
        label: 'Sistema',
        items: [
            { label: 'Tradução', icon: 'pi pi-language', to: '/Traducao'},
        ]
    },   
]);
</script>
