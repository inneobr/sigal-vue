<template>
    <div class="card">
       <div class="flex justify-content-between gap-2">
         <div class="flex align-items-center">
            <i class="pi pi-list" style="font-size: 1.5rem;"></i>
            <h5 class="m-2">Empresas</h5><hr />
         </div> 

         <div class="flex gap-2">
            <Button type="button" label="Cadastrar" class="p-button-info" icon="pi pi-plus" @click="newRegister()" />
         </div>         
      </div> 
        
       <DataTable selectionMode="single" v-model:selection="rowSelected" :value="empresas" responsiveLayout="stack">
 
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
 
          <Column field="cnpj" header="CPF / CNPJ"/>
          <Column field="ie" header="IE" />
          <Column field="razaoSocial" header="Razão Social" />
          <Column field="nomeFantasia" header="Nome Fantasia" />
          <Column field="telefone" header="Telefone" />
          <Column field="email" header="Email" />
          <Column field="site" header="Site" />
          <Column field="cidade" header="Cidade" />
          <Column field="uf" header="UF" />
          <Column header="Opções">
                <template #body="{ data }">
                   <div class="flex gap-2">
                     <Button class="p-button-rounded" icon="pi pi-pencil" severity="info" outlined @click="update(data)" />
                     <Button class="p-button-rounded" icon="pi pi-trash"  severity="warning" outlined @click="deleteEmpresa(data.id)" />
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
    
    <Dialog v-model:visible="isRegister" class="col-12 lg:col-6 xl:col-6" header="SISTEMA SIG - EMPRESAS" :modal="true">     
      <inputText class="col-12 lg:col-12 xl:col-5 mt-0" v-model="empresa.cnpj" placeholder="CPF / CNPJ"/>
      <inputText class="col-12 lg:col-12 xl:col-6 mt-1" v-model="empresa.ie" placeholder="Inscrição Estadual"/>
      <inputText class="col-12 lg:col-12 xl:col-6 mt-1" v-model="empresa.razaoSocial" placeholder="Razão Social / Nome"/>
      <inputText class="col-12 lg:col-12 xl:col-5 mt-1" v-model="empresa.nomeFantasia" placeholder="Nome Fantasia / Apelido"/>
      <inputText class="col-12 lg:col-12 xl:col-5 mt-1" v-model="empresa.telefone" placeholder="Telefone"/>
      <inputText class="col-12 lg:col-12 xl:col-6 mt-1" v-model="empresa.whatsapp" placeholder="WhatsApp"/>
      <inputText class="col-12 lg:col-12 xl:col-6 mt-1" v-model="empresa.email" placeholder="Email"/>
      <inputText class="col-12 lg:col-12 xl:col-5 mt-1" v-model="empresa.site" placeholder="Site"/>
      <inputText class="col-12 lg:col-12 xl:col-6 mt-1" v-model="empresa.endereco" placeholder="Endereço"/>
      <inputText class="col-12 lg:col-12 xl:col-5 mt-1" v-model="empresa.bairro" placeholder="Bairro"/>
      <inputText class="col-12 lg:col-12 xl:col-4 mt-1" v-model="empresa.cidade" placeholder="Cidade"/>
      <inputText class="col-12 lg:col-12 xl:col-4 mt-1" v-model="empresa.uf" placeholder="UF"/>
      <inputText class="col-12 lg:col-12 xl:col-3 mt-1" v-model="empresa.cep" placeholder="Cep"/>
      
      <div class="field-checkbox mt-4">
         <InputSwitch v-model="empresa.simples" />
         <label for="checkOption">Empresa optante pelo SIMPLES NACIONAL</label>
      </div>
      <div class="field-checkbox">
         <InputSwitch v-model="empresa.estoqueZero" />
         <label for="checkOption">Movimentar produtos sem estoque?</label>
      </div>

      <div class="divisor-botton"></div>
      <template #footer>
         <Button label="Cancelar" icon="pi pi-times" class="p-button p-component p-button-danger " @click="dialog = false; isRegister = false;" />
         <Button label="Salvar" icon="pi pi-save" class="p-button p-component p-button-success " @click="setEmpresas()" />
      </template>
   </Dialog>
    <Toast />
 </template>
 
 <script>  
   import EmpresaService from '../../service/EmpresaService';
   export default {
      name: 'Register Empresa',
      props: {
         id: {
            type: String,
            required: false
         }
      },
      
      data() {
         return { 
            empresa: {}, 
            empresas: null,
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
         async setEmpresas(){
            if(this.isValid()) return;
            await EmpresaService.register(this.empresa)
               .then(({ data }) => {
                  this.$toast.add({ 
                     severity: 'success', 
                     summary: 'Cadastrado com sucesso', 
                     detail: 'Cadastro foi realizado com sucesso.', 
                     life: 3000 
                  });                  
                  this.resetFormularios();
               }).catch(error => {
                  console.log(error)
                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel realizar o cadastro, por favor tente mais tarde.', 
                     life: 3000 
                  });
                  this.isRegister = false;
                  this.getEmpresas();
               });
         },

         async getEmpresas(){
            await EmpresaService.pageAllFilter(this.filter, this.pagina, this.pageSize)
               .then(({ data }) => {
                  this.empresas = data.content;  
                  this.pageSize = data.pageable.pageSize;
                  this.totalElementos = data.totalElements;
               }).catch(error => {
                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel carregar sua requisição, por favor tente mais tarde.', 
                     life: 3000 });

                     setTimeout(() => {
                        this.getEmpresas();
                     }, 10000);
               });
         },

         async deleteEmpresa(empresaID){
            await EmpresaService.deleteEmpresa(empresaID)
               .then(({ data }) => {
                  this.$toast.add({ 
                     severity: 'success', 
                     summary: 'Sucesso.', 
                     detail: 'Registro deletado com sucesso..', 
                     life: 3000 });

                  this.getEmpresas();   
               }).catch(error => {
                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel carregar sua requisição, por favor tente mais tarde.', 
                     life: 3000 });

                  this.getEmpresas();
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
         
         update(empresa){
            this.empresa = empresa;
            this.isRegister = true;
         },

         resetFormularios(){            
            this.isRegister = false;
            this.empresa = {};
            this.getEmpresas();
         },

         isValid(){            
            let fildNull = false;
            let message = [];

            if(this.empresa.cnpj === undefined) {
               message.push("Campo CNPJ inválido.")
               fildNull = true;
            }

            if(this.empresa.ie === undefined) {
               message.push("Campo IE inválido.")
               fildNull = true;
            }

            if(this.empresa.razaoSocial === undefined) {
               message.push("Campo Razão Social inválido.")
               fildNull = true;
            }

            if(this.empresa.nomeFantasia === undefined) {
               message.push("Campo Nome Fantasia inválido.")
               fildNull = true;
            }

            if(this.empresa.telefone === undefined) {
               message.push("Campo Telefone inválido.")
               fildNull = true;
            }

            if(this.empresa.endereco === undefined) {
               message.push("Campo Endereco inválido.")
               fildNull = true;
            }

            if(this.empresa.bairro === undefined) {
               message.push("Campo Bairro inválido.")
               fildNull = true;
            }

            if(this.empresa.cidade === undefined) {
               message.push("Campo Cidade inválido.")
               fildNull = true;
            }

            if(this.empresa.uf === undefined) {
               message.push("Campo UF inválido.")
               fildNull = true;
            }

            if(this.empresa.cep === undefined) {
               message.push("Campo Cep inválido.")
               fildNull = true;
            }

            if(this.empresa.simples === undefined) {
               this.empresa.simples = false;
               fildNull = true;
            }
            
            if(this.empresa.estoqueZero === undefined) {
               this.empresa.estoqueZero = false;
               fildNull = true;
            }
            if(fildNull) this.$toast.add({  severity: 'error', summary: 'Dados inválidos', detail: message, life: 10000 });

            return fildNull;
         },  
         
         onPage(event) {
            this.pagina = event.page;
            this.pageSize = event.rows;
            this.firstRow = event.rows * event.page;
            this.getEmpresas();
         }
      },
      created() {
         this.getEmpresas();
      },
   }
 </script>    