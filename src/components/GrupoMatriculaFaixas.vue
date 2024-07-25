<template> 
    <Fieldset legend="Faixas Matrícula">
        <DataTable selectionMode="single" v-model:selection="selected" :value="database" responsiveLayout="stack"> 
            <template #header>
                <div class="grid">
                    <div class="field col-12 md:col-3">
                        <label for="faixa">Nº Faixa</label>
                        <inputText id="faixa" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.faixa" placeholder="Número Faixa"/> 
                    </div> 

                    <div class="field col-12 md:col-3">
                        <label for="matriculaInicial">Matrícula Inicial</label>
                        <inputText id="matriculaInicial" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.matriculaIni" placeholder="Matrícula Inicial"/> 
                    </div> 

                    <div class="field col-12 md:col-3">
                        <label for="matriculaFinal">Matrícula Final</label>
                        <inputText id="matriculaFinal" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.matriculaFim" placeholder="Matrícula Final"/> 
                    </div> 
                    <div class="field col-12 md:col-3">
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

            <Column field="grupo" header="Grupo"/>
            <Column field="faixa" header="Faixa"/>
            <Column field="matriculaIni" header="Matrícula Inicial"/>
            <Column field="matriculaFim" header="Matrícula Final"/>
            <Column header="Opções">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button class="p-button-rounded" icon="pi pi-pencil" severity="--primary-color"    outlined @click="alterarRegistro(data)" />
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
    </Fieldset>
</template> 

<script>
    import GruposMatriculaFaixasService from '@service/GruposMatriculaFaixasService';
    export default {
        name: 'Grupo Matricula Faixas',
        props: {
            grupo: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                filter: {},
                database: [],              
                registro: null,
 
                pagina: 0, 
                firstRow: 0,
                pageSize: 15,
                selected: {},
                onDialog: false,
                totalElementos: 0
            }
        },
        methods: {
            async getPagina(){ 
                this.filter.grupo = this.grupo;            
                await GruposMatriculaFaixasService.filter(this.filter, this.pagina, this.pageSize)
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
                                this.selected.grupo = this.grupoID;
                await GruposMatriculaFaixasService.save(this.selected)
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
                await GruposMatriculaFaixasService.deleteRegister(id)
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