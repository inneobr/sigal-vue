<template> 
   <div class="grid">
       <div class="col-12">
           <div class="card">
               <div class="flex justify-content-between gap-2">
                   <h5>Menu</h5>                    
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
                   
                   <Column field="label" header="Menu principal"/>
                   <Column field="icon"  header="Ícon do menu"/>
                   <Column field="sequencia" header="Posição"/>
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
                    :rowsPerPageOptions="[5, 10, 20, 30]"
                    @page="onPage" />
           </div>
       </div>
   </div>

   <Dialog v-model:visible="onDialog" class="flex flex-col col-6" header="RH 2.0 - TRADUÇÃO" :modal="true"> 
       <div class="divisor-botton mb-4"/>  
           <div class="formgrid grid">
            <div class="field col-12 md:col-2">
               <label for="sequencia">Sequência</label>
               <inputText id="sequencia" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.sequencia" placeholder="Sequência"/> 
           </div>      
            <div class="field col-12 md:col-5">
               <label for="label">Menu</label>
               <inputText id="label" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.label" placeholder="Menu"/> 
           </div>     
           <div class="field col-12 md:col-5">
               <label for="icon">Icon</label>
               <inputText id="icon" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" v-model="selected.icon" placeholder="Icon"/> 
           </div> 

           <div class="field col-12 md:col-12">
                <ItemsMenuPrincipal v-show="selected.id" :menuId="selected.id" :menus="database"/>
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
   import service from '@service/MenuService';
   import ItemsMenuPrincipal from '@components/MenuItem.vue';
   export default {
       name: 'Formacao',
       components: { ItemsMenuPrincipal },
       data() {
           return {
               database: [],  
               selected: {},              
               registro: null,
               onDialog: false,
           }
       },
       methods: {
           async getPagina(){
               await service.findList()
                   .then(({ data }) => {                   
                        this.database = data;                                      
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