<template>
    <ul class="layout-menu">
        <template  v-for="(item, i) in database" :key="item">
            <app-menu-item v-if="!item.separator" :item=" item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<script setup>
    import { ref } from 'vue';
    import AppMenuItem from './AppMenuItem.vue';
    const model = ref([{label: "Problemas com o servidor, atualizando em 60 sec."}]);
</script>

<script >
    import service from '@service/MenuService';
    export default {
        name: 'Menus',
        data() {
            return {
                database: [], 
                selected: {},              
                registro: null,
            }
        },
        methods: {
            async getPagina(){
                await service.findList()
                    .then(({ data }) => {
                        this.database = [{                           
                            items: data
                        }];                      
                    })
                    .catch(error => {
                        this.$toast.add({ 
                            severity: 'error', 
                            summary: 'Servidor indísponivel', 
                            detail: 'Não foi possivel carregar sua requisição, por favor tente mais tarde.', 
                            life: 3000 });
 
                            setTimeout(() => {
                                this.getPagina();
                            }, 10000);
                    }
                );
            },
            async salvarRegistro(){
                await service.save(this.selected)
                .then(({ data }) => {
                    this.$toast.add({ 
                        severity: 'success', 
                        summary: 'Cadastrado com sucesso', 
                        detail: 'Cadastro foi realizado com sucesso.', 
                        life: 3000 
                    });          
                }).catch(error => {
                    this.$toast.add({ 
                        severity: 'error', 
                        summary: 'Servidor indísponivel', 
                        detail: 'Não foi possivel realizar o cadastro, por favor tente mais tarde.', 
                        life: 3000 
                    });
                });
                this.clearRegistro();
            },
            async deletarRegistro(id){          
                await service.deleteRegister(id)
                .then(({ data }) => {
                    this.$toast.add({ 
                        severity: 'success', 
                        summary: 'Sucesso.', 
                        detail: 'Registro deletado com sucesso..', 
                        life: 3000 });
                    this.getPagina();   
                }).catch(error => {
                    this.$toast.add({ 
                        severity: 'error', 
                        summary: 'Servidor indísponivel', 
                        detail: 'Não foi possivel carregar sua requisição, por favor tente mais tarde.' + error, 
                        life: 3000 });
                        
                    this.clearRegistro();
                });
            },            
            novoRegistro(){
                this.selected = {};
                this.onDialog = true;
            },
            alterarRegistro(data){
                this.onDialog = true;
                this.selected = data;
            },
            clearRegistro(){
                this.onDialog = false;
                this.selected = {};
                this.getPagina();
            }
        },
        created() {
            this.getPagina();
        }
    }
</script>
