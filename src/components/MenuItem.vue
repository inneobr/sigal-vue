<template> 
    <Fieldset legend="Itens Menu">
        <DataTable selectionMode="single" v-model:selection="selected" :value="database" responsiveLayout="stack"> 
            <template #header>
                <div class="grid">
                    <div class="field col-12 md:col-4">
                        <label for="label">Nome</label>
                        <inputText id="label" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.label" placeholder="Nome"/> 
                    </div> 

                    <div class="field col-12 md:col-4">
                        <label for="path">Rota</label>
                        <inputText id="path" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.path" placeholder="Rota"/> 
                    </div>                   

                    <div class="field col-12 md:col-4">
                        <label for="icon">Icon</label>
                        <Dropdown editable v-model="selected.icon" :options="dataicon" optionLabel="label" optionValue="values" placeholder="Selecione" class="w-full"/>
                    </div> 

                    <div class="field col-12 md:col-4">
                        <label for="menu">Menu</label>
                        <Dropdown editable v-model="selected.menuId" :options="menus" optionLabel="label" optionValue="id" placeholder="Selecione" class="w-full"/>   
                    </div> 
                    
                    <div class="field col-12 md:col-4">
                        <label for="sequencia">Sequência</label>
                        <inputText id="sequencia" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.sequencia" placeholder="Sequência"/> 
                    </div> 
                    
                    <div class="field col-12 md:col-4">
                        <label class="w-full" for="matriculaFinal">Opções</label>
                        <Button class="p-button p-component p-button-success" label="Save" icon="pi pi-save" severity="info" outlined @click="salvarRegistro()" />
                    </div>
                </div>
            </template>

            <template #empty>
                Nenhum registro encontrado.
            </template>

            <template #loading>
                Carregando... Por favor, aguarde.
            </template>   

            <Column field="label" header="Nome"/>
            <Column field="icon" header="Icon"/>
            <Column field="path" header="Rota"/>
            <Column field="sequencia" header="Sequência"/>
            <Column header="Opções">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button class="p-button-rounded" icon="pi pi-pencil" severity="--primary-color"    outlined @click="alterarRegistro(data)" />
                        <Button class="p-button-rounded" icon="pi pi-trash"  severity="warning"             outlined @click="deletarRegistro(data.id)" />
                    </div>
                </template>
            </Column>
        </DataTable>
        <Paginator
                v-model:first="firstRow"
                    :rows="pageSize"
                    :total-records="totalElementos"
                    :rowsPerPageOptions="[5, 15, 30, 60]"
                    @page="onPage" />
    </Fieldset>
</template> 

<script>
    import service from '@service/MenuItemService';
    export default {
        name: 'Items Menu Principal',
        props: {
            menuId: {
                type: String,
                required: true
            },
            menus:[],
        },
        data() {
            return {
                filter: {},
                database: [],              
                registro: null,
 
                pagina: 0, 
                firstRow: 0,
                pageSize: 5,
                selected: {},
                totalElementos: 0,
                dataicon: [
                    {label: 'pi pi-book', value: 'pi pi pi-book'},
                    {label: 'pi-chart-line', value: 'pi pi-chart-line'}
                ]
            }
        },
        methods: {
            async getPagina(){ 
                this.filter.menuId = this.menuId;            
                await service.filter(this.filter, this.pagina, this.pageSize)
                    .then(({ data }) => {
                        this.database        = data.content;  
                        this.pageSize        = data.pageable.pageSize;
                        this.totalElementos  = data.totalElements;                                            
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
                this.selected.menuId = this.menuId;
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
            },
            alterarRegistro(data){
                this.selected = data;
            },
            onPage(event) {
                this.pagina = event.page + 1;
                this.pageSize = event.rows;
                this.firstRow = event.rows * event.page;
                this.getPagina();
            },
            clearRegistro(){
                this.selected = {};
                this.getPagina();
            }
        },
        created() {
            this.getPagina();
        }
    }
 </script>