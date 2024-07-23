<template> 
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex justify-content-between gap-2">
                    <h5>Tipo Formação</h5>                    
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
                    
                    <Column class="w-full" field="descricao" header="Descrição"/>
                    <Column field="tipComplementar" header="Complementar">
                        <template #body="{ data }">
                            {{ data.tipComplementar == 1 ? "Sim" : "Não" }}
                        </template>
                    </Column>
                    <Column field="tipPublico" header="Disponivel">
                        <template #body="{ data }">
                            {{ data.tipPublico == 1 ? "Sim" : "Não" }}
                        </template>
                    </Column>
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

    <Dialog v-model:visible="onDialog" class="flex flex-col col-6" header="RH 2.0 - TIPO FORMAÇÃO" :modal="true"> 
        <div class="divisor-botton mb-4"/>  
            <div class="formgrid grid">
            <div class="field col-12 md:col-2">
                <label for="id">ID</label>
                <inputText id="id" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.id" placeholder="ID" disabled="true"/>
            </div>
            <div class="field col-12 md:col-10">
                <label for="descricao">Descrição</label>
                <inputText id="descricao" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.descricao" placeholder="Descricao"/> 
            </div> 
            <div class="field col-12 md:col-4">
                <label for="formacao">Formação</label>
                <Dropdown v-model="selected.tipFormacao" editable :options="formacaoEnum" optionLabel="name" optionValue="value" placeholder="Selecione" class="w-full"/>   
            </div>   
            <div class="field col-12 md:col-4">
                <label for="complementar">Complementar</label>
                <Dropdown v-model="selected.tipComplementar" editable :options="complementarEnum" optionLabel="name" optionValue="value" placeholder="Selecione" class="w-full"/>   
            </div> 
            <div class="field col-12 md:col-4">
                <label for="publico">Disponível</label>
                <Dropdown v-model="selected.tipPublico" editable :options="disponivelEnum" optionLabel="name" optionValue="value" placeholder="Selecione" class="w-full"/>   
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
    import TipoFormacaoService from '../../service/TipoFormacaoService';
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

                formacaoEnum: [],
                disponivelEnum: [],
                complementarEnum: []
            }
        },
        methods: {
            async getPagina(){
                await TipoFormacaoService.findAll(this.pagina, this.pageSize)
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
                await TipoFormacaoService.save(this.selected)
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
                await TipoFormacaoService.deleteRegister(id)
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
            async getFormacaoEnum(){
                await TipoFormacaoService.formacaoEnum()
                    .then(({ data }) => {
                        this.formacaoEnum = data;                    
                    });             
            },
            async getComplementarEnum(){
                await TipoFormacaoService.complementarEnum()
                    .then(({ data }) => {
                        this.complementarEnum = data;                    
                    });             
            },
            async getDisponivelEnum(){
                await TipoFormacaoService.disponivelEnum()
                    .then(({ data }) => {
                        this.disponivelEnum = data;                    
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
            this.getFormacaoEnum();
            this.getDisponivelEnum();
            this.getComplementarEnum();
        }
    }
</script>
 