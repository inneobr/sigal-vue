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
            { label: 'TipoCargos', icon: 'pi pi-user', to: '/TipoCargos'},
            { label: 'TipoFormacao', icon: 'pi pi-user', to: '/TipoFormacao'}
        ]
    },    
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
