<template>
    <div class="card">
       <div class="flex justify-content-between gap-2">
         <div class="flex align-items-center">
            <i class="pi pi-list" style="font-size: 1.5rem;"></i>
            <h5 class="m-2">Tipo Cargos</h5><hr />
         </div> 

         <div class="flex gap-2">
            <Button type="button" label="Cadastrar" class="p-button-info" icon="pi pi-plus" @click="newRegister()" />
         </div>         
      </div> 
        
       <DataTable selectionMode="single" v-model:selection="rowSelected" :value="tipocargosData" responsiveLayout="stack">
 
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
 
          <Column field="tipo" header="Tipo"/>
          <Column field="descricao" header="Descricao" style="width: 100%"/>
          <Column header="Opções">
                <template #body="{ data }">
                   <div class="flex gap-2">
                     <Button class="p-button-rounded" icon="pi pi-pencil" severity="info" outlined @click="editarRegistro(data)" />
                     <Button class="p-button-rounded" icon="pi pi-trash"  severity="warning" outlined @click="deletarRegistro(data)" />
                   </div>
                </template>
          </Column>
       </DataTable>
       <Paginator :rows="pageSize"
            v-model:first="firstRow"
            :total-records="totalElementos"
            :rowsPerPageOptions="[1, 6, 12]"
            @page="onPage" />
    </div>    
    
    <Dialog v-model:visible="isRegister" class="col-12 lg:col-6 xl:col-6" header="SISTEMA - TIPO CARGOS" :modal="true">     
      <inputText class="col-4 m-2" v-model="tipocargos.tipo" placeholder="Tipo" disabled="true"/>
      <inputText class="col-8 m-2" v-model="tipocargos.descricao" placeholder="Descricao"/> 

      <div class="divisor-botton"></div>
      <template #footer>
         <Button label="Cancelar" icon="pi pi-times" class="p-button p-component p-button-danger " @click="dialog = false; isRegister = false;" />
         <Button label="Salvar" icon="pi pi-save" class="p-button p-component p-button-success " @click="salvarDados()" />
      </template>
   </Dialog>
    <Toast />
 </template>
 
 <script>  
   import TipoCargosService from '../../service/TipoCargosService';
   export default {
      name: 'TipoCargos',
      props: {
         id: {
            type: String,
            required: false
         }
      },
      
      data() {
         return { 
            tipocargos: {}, 
            tipocargosData: null,
            isRegister: false,

            filter: null,
            pagina: 0, 
            firstRow: 0,
            pageSize: 12,
            rowSelected: null,
            totalElementos: 0, 
         }
      },
 
      methods: {
         async salvarDados(){
            if(this.isValid()) return;
            await TipoCargosService.save(this.tipocargos)
               .then(({ data }) => {
                  this.$toast.add({ 
                     severity: 'success', 
                     summary: 'Cadastrado com sucesso', 
                     detail: 'Cadastro foi realizado com sucesso.', 
                     life: 3000 
                  });                  
                  this.resetFormularios()
               }).catch(error => {
                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel realizar o cadastro, por favor tente mais tarde.', 
                     life: 3000 
                  });
                  this.isRegister = false;
                  this.getTipoCargos();
               });
         },

         async getTipoCargos(){
            await TipoCargosService.findAll(this.pagina, this.pageSize)
               .then(({ data }) => {
                  this.tipocargosData  = data.content;  
                  this.pageSize        = data.pageable.pageSize;
                  this.totalElementos  = data.totalElements;
               }).catch(error => {
                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel carregar sua requisição, por favor tente mais tarde.', 
                     life: 3000 });

                     setTimeout(() => {
                        this.getTipoCargos();
                     }, 10000);
               });
         },

         async deletarRegistro(data){          
            await TipoCargosService.deleteRegister(data)
               .then(({ data }) => {
                  this.$toast.add({ 
                     severity: 'success', 
                     summary: 'Sucesso.', 
                     detail: 'Registro deletado com sucesso..', 
                     life: 3000 });

                  this.getTipoCargos();   
               }).catch(error => {
                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel carregar sua requisição, por favor tente mais tarde.' + error, 
                     life: 3000 });

                  this.getTipoCargos();
               });
         },
   
         isRouter(){
            if(this.$route.params.id) {
               const id = this.$route.params.id;
               if(id) this.id = id;
            }
            else {                    
               this.id = null;
            }
         },
   
         newRegister(){
            this.isRegister = true;
         },
         
         editarRegistro(data){
            this.tipocargos = data;
            this.isRegister = true;
         },

         resetFormularios(){            
            this.isRegister = false;
            this.tipocargos = {};
            this.getTipoCargos();
         },

         isValid(){            
            let fildNull = false;
            let message = []; 
            
            if(this.tipocargos.descricao === undefined || this.tipocargos.descricao === '' || this.tipocargos.descricao === null) {
               message.push("Campo Descrição inválido.")
               fildNull = true;
            } ; 

            if(fildNull) this.$toast.add({  severity: 'error', summary: 'Dados inválidos', detail: message, life: 10000 });

            return fildNull;
         },  
         
         onPage(event) {
            this.pagina = event.page;
            this.pageSize = event.rows;
            this.firstRow = event.rows * event.page;
           this.getTipoCargos();
         }
      },
      created() {
         this.getTipoCargos();
      },
   }
 </script>   