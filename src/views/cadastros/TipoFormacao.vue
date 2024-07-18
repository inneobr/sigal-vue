<template> 
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="flex justify-content-between gap-2">
                    <h5>Tipo Formacao</h5>                    
                    <Button type="button" label="Novo" class="--primary-color" icon="pi pi-file" @click="novo()" />               
                </div>
                <Divider />
                <DataTable selectionMode="single" v-model:selection="selected" :value="database" responsiveLayout="stack"> 
                    <template #header>
                        <div class="flex justify-content-between">
                            <div class="flex gap-2">
                                
                            </div>
                        </div>
                    </template>

                    <template #empty>
                        Nenhum registro encontrado.
                    </template>

                    <template #loading>
                        Carregando... Por favor, aguarde.
                    </template>
                    
                    <Column field="descricao" header="Descrição"/>
                    <Column field="tipoConhecimento" header="Tipo Conhecimento"/>
                    <Column field="discComplementar" header="Disc. Complementar"/>
                    <Column field="publico" header="Dados Publicos"/>
                    <Column header="Opções">
                        <template #body="{ data }">
                            <div class="flex gap-2">
                                <Button class="p-button-rounded" icon="pi pi-pencil" severity="info"    outlined @click="alterarRegistro(data)" />
                                <Button class="p-button-rounded" icon="pi pi-trash"  severity="warning" outlined @click="deletarRegistro(data)" />
                            </div>
                        </template>
                    </Column>
                    </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
  import TipoFormacaoService from '../../service/TipoFormacaoService';
    export default {
        name: 'Formacao',
        data() {
            return {
                database: {},
                selected: {},
                registro: null,
            }
        }

    }
</script>
 