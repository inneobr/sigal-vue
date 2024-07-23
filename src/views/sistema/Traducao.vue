<template> 
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex justify-content-between gap-2">
                    <h5>Tradução</h5>                    
                    <Button type="button" label="Novo" class="--primary-color" icon="pi pi-file" @click="novoRegistro()" />               
                </div>
                <Divider />
                <DataTable selectionMode="single" v-model:selection="selected" :value="database" responsiveLayout="stack"> 
                    <template #header>

                    </template>

                    <template #empty>
                        Nenhum registro encontrado.
                    </template>

                    <template #loading>
                        Carregando... Por favor, aguarde.
                    </template>
                    
                    <Column field="idioma" header="Idioma">
                        <template #body="{ data }">
                            {{ data.idioma == 1 ? "Português" : "Outros" }}
                        </template>
                    </Column>
                    <Column field="rotina" header="Rotina"/>
                    <Column field="chave" header="Chave"/>
                    <Column field="traducao" header="Tradução"/>
                    <Column header="Opções">
                        <template #body="{ data }">
                            <div class="flex gap-2">
                                <Button class="p-button-rounded" icon="pi pi-pencil" severity="info"    outlined @click="alterarRegistro(data)" />
                                <Button class="p-button-rounded" icon="pi pi-trash"  severity="warning" outlined @click="deletarRegistro(data.id)" />
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
            </div>
        </div>
    </div>

    <Dialog v-model:visible="onDialog" class="flex flex-col col-6" header="RH 2.0 - TRADUÇÃO" :modal="true"> 
        <div class="divisor-botton mb-4"/>  
            <div class="formgrid grid">
            <div class="field col-12 md:col-4">
                <label for="idioma">Idioma</label>
                <Dropdown id="idioma" v-model="selected.idioma" editable :options="idiomaEnum" optionLabel="name" optionValue="value" placeholder="Selecione" class="w-full"/>   
            </div> 
            <div class="field col-12 md:col-8">
                <label for="rotina">Rotina</label>
                <inputText id="rotina" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.rotina" placeholder="Rotina"/> 
            </div> 
            <div class="field col-12 md:col-6">
                <label for="chave">Chave</label>
                <inputText id="chave" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.chave" placeholder="Chave"/> 
            </div> 
            <div class="field col-12 md:col-6">
                <label for="traducao">Tradução</label>
                <inputText id="traducao" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.traducao" placeholder="Traducao"/> 
            </div> 
        </div>  
        <div class="divisor-botton"/>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button p-component p-button-danger" @click="dialog = false; onDialog = false;" />
            <Button label="Salvar"   icon="pi pi-save" class="p-button p-component p-button-success" @click="salvarRegistro()" />
        </template>
   </Dialog>
</template>

<script>
    import TraducaoService from '../../service/TraducaoService';
    export default {
        name: 'Formacao',
        data() {
            return {
                database: [],                
                registro: null,

                pagina: 0, 
                firstRow: 0,
                pageSize: 15,
                selected: {},
                onDialog: false,
                totalElementos: 0,

                idiomaEnum: [
                    {name: "Portugues", value: 1},
                    {name: "Outros", value: 2}
                ]
            }
        },
        methods: {
            async getPagina(){
                await TraducaoService.findAll(this.pagina, this.pageSize)
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
                await TraducaoService.save(this.selected)
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
                await TraducaoService.deleteRegister(id)
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
            onPage(event) {
                this.pagina = event.page + 1;
                this.pageSize = event.rows;
                this.firstRow = event.rows * event.page;
                this.getPagina();
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
 