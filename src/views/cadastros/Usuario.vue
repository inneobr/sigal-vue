<template>
    <div class="card">
       <div class="flex justify-content-between gap-2">
         <div class="flex align-items-center">
            <i class="pi pi-user" style="font-size: 1.5rem;"></i>
            <h5 class="m-2">Usuários</h5><hr />
         </div> 

         <div class="flex gap-2">
            <Button type="button" label="Cadastrar" class="p-button-info" icon="pi pi-plus" @click="newRegister()" />
         </div>         
      </div> 
        
       <DataTable selectionMode="single" v-model:selection="rowSelected" :value="usuarios" responsiveLayout="stack">
 
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
 
          <Column field="name" header="Nome completo"/>
          <Column field="email" header="Email" />
          <Column field="role" header="Autorização">
            <template #body="{ data }">
               <span v-if="data.role === 'ROLE_ADMIN'">Gerente Administrador</span>
               <span v-if="data.role === 'ROLE_VENDEDOR'">Consultor de vendas</span>
            </template>
         </Column>
         <Column field="alertaEstoque" header="Alerta Estoque" >
            <template #body="{ data }">
               {{ data.alertaEstoque ? 'Sim' : 'Não' }}
            </template>
         </Column>
         <Column field="alertaValidade" header="Alerta Validade" >
            <template #body="{ data }">
               {{ data.alertaValidade ? 'Sim' : 'Não' }}
            </template>
         </Column>
         <Column field="alertaEmprestimo" header="Alerta Empréstimo" >
            <template #body="{ data }">
               {{ data.alertaEmprestimo ? 'Sim' : 'Não' }}
            </template>
         </Column>
          <Column header="Opções">
                <template #body="{ data }">
                   <div class="flex gap-2">
                     <Button class="p-button-rounded" icon="pi pi-pencil" severity="info"    outlined @click="update(data)" />
                     <Button class="p-button-rounded" icon="pi pi-trash"  severity="warning" outlined @click="deleteUsuario(data.id)" />
                   </div>
                </template>
          </Column>
       </DataTable>
       <Paginator v-model:first="firstRow"
            :rows="pageSize"            
            :total-records="totalElementos"
            :rowsPerPageOptions="[1, 6, 12]"
            @page="onPage" />
    </div>    
    
    <Dialog v-model:visible="isRegister" class="col-12 lg:col-4 xl:col-4" header="SISTEMA SIG" :modal="true"> 
      <inputText class="col-12 lg:col-12 xl:col-12 mt-0"  v-model="usuario.name" placeholder="Nome"/>        
      <inputText class="col-12 lg:col-12 xl:col-12 mt-1"  v-model="usuario.email" placeholder="email"/>
      <inputText class="col-12 lg:col-12 xl:col-6  mt-1"  v-model="usuario.username" placeholder="username"/>
      <inputText class="col-12 lg:col-12 xl:col-6  mt-1"  v-model="usuario.password" placeholder="password"/>  
      <Dropdown  class="col-12 p-2 mt-1" v-model="usuario.autority" :options="roles" optionLabel="name" placeholder="Tipo Usuário"/>
      <Fieldset legend="Receber alertas" class="flex align-items-center justify-content-between gap-2">
         <ToggleButton v-model="usuario.alertaEstoque"    onLabel="estoque" offLabel="estoque" onIcon="pi pi-lock" class="m-2" offIcon="pi pi-lock-open" />
         <ToggleButton v-model="usuario.alertaValidade"   onLabel="validade" offLabel="validade" onIcon="pi pi-lock" class="m-2" offIcon="pi pi-lock-open" />
         <ToggleButton v-model="usuario.alertaEmprestimo" onLabel="empréstimo" offLabel="empréstimo" onIcon="pi pi-lock"  class="m-2" offIcon="pi pi-lock-open" />
      </Fieldset>
      <Divider type="solid" />
      <template #footer>
           <Button label="Cancelar" icon="pi pi-times" class="p-button p-component p-button-danger " @click="dialog = false; isRegister = false;" />
           <Button label="Salvar" icon="pi pi-save" class="p-button p-component p-button-success " @click="setUsuario()" />
      </template>
   </Dialog>

   <Dialog v-model:visible="isPermissoes" class="col-12 lg:col-4 xl:col-4" header="PERMISSÕES DE USUÁRIO" :modal="true"> 
      <Fieldset legend="Receber alertas" class="flex align-items-center justify-content-between gap-2">
         <ToggleButton v-model="usuario.alertaEstoque"    onLabel="estoque" offLabel="estoque" onIcon="pi pi-lock" class="m-2" offIcon="pi pi-lock-open" />
         <ToggleButton v-model="usuario.alertaValidade"   onLabel="validade" offLabel="validade" onIcon="pi pi-lock" class="m-2" offIcon="pi pi-lock-open" />
         <ToggleButton v-model="usuario.alertaEmprestimo" onLabel="empréstimo" offLabel="empréstimo" onIcon="pi pi-lock"  class="m-2" offIcon="pi pi-lock-open" />
      </Fieldset>
   </Dialog>
    <Toast />
 </template>
 
 <script>  
   import UsuarioService from '@service/UsuarioService';
   export default {
      name: 'Register Empresa',    
      
      data() {
         return { 
            id: null,
            roles: null,
            usuario: {}, 
            usuarios: null,
            isRegister: false,
            isPermissoes: true,

            filter: null,
            pagina: 0, 
            firstRow: 0,
            pageSize: 12,
            rowSelected: null,
            totalElementos: 0,                 
         }
      },
 
      methods: {
         async setUsuario(){
            if(this.isValid()) return;
            await UsuarioService.register(this.usuario)
               .then(({ data }) => {
                  this.$toast.add({ 
                     severity: 'success', 
                     summary: 'Cadastrado com sucesso', 
                     detail: 'Cadastro foi realizado com sucesso.', 
                     life: 3000 
                  });                  
                  this.resetFormularios();
               }).catch(error => {
                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel realizar o cadastro, por favor tente mais tarde.', 
                     life: 3000 
                  });
               });
         },

         async getUsuarios(){
            await UsuarioService.pageAll(this.filter, this.pagina, this.pageSize)
               .then(({ data }) => {
                  this.usuarios = data.content;  
                  this.pageSize = data.pageable.pageSize;
                  this.totalElementos = data.totalElements; 
               }).catch(error => {
                  this.usuarios = null;

                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel carregar sua requisição, por favor tente mais tarde.', 
                     life: 3000 });

                  setTimeout(() => {
                     this.getUsuarios();
                  }, 10000);   
               });
         },

         
         async deleteUsuario(id){           
            await UsuarioService.deleteUsuario(id)
               .then(({ data }) => {
                  this.$toast.add({ 
                     severity: 'success', 
                     summary: 'Sucesso.', 
                     detail: 'Registro deletado com sucesso..', 
                     life: 3000 });

                  this.getUsuarios();   
               }).catch(error => {
                  this.usuarios = null;

                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel carregar sua requisição, por favor tente mais tarde.', 
                     life: 3000 });
               });
         },
         async getRoles(){
            await UsuarioService.getRoles()
              .then(({ data }) => {
                  this.roles = data;                  
               }).catch(error => {
                  this.roles = null;

                  this.$toast.add({ 
                     severity: 'error', 
                     summary: 'Servidor indísponivel', 
                     detail: 'Não foi possivel carregar sua requisição, por favor tente mais tarde.', 
                     life: 3000 });

                  setTimeout(() => {
                     this.getUsuarios();
                  }, 10000);   
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
         
         update(usuario){
            this.usuario = usuario;
            this.isRegister = true; 
            this.usuario.role = this.roles.find(item => { return item.valor === usuario.role });
         },

         resetFormularios(){            
            this.isRegister = false;
            this.usuario = null;
            this.getUsuarios();
         },

         isValid(){            
            let fildNull = false;
            let message = [];

            if(this.usuario.name === undefined) {
               message.push("Campo Nome inválido.")
               fildNull = true;
            }

            if(this.usuario.email === undefined) {
               message.push("Campo EMAIL inválido.")
               fildNull = true;
            }

            if(this.usuario.username === undefined) {
               message.push("Campo USERNAME inválido.")
               fildNull = true;
            }

            if(this.usuario.id === undefined && this.usuario.password === undefined) {
               message.push("Campo PASSWORD inválido.")
               fildNull = true;
            }

            if(this.usuario.id === undefined && this.usuario.autority === undefined) {
               message.push("Campo TIPO USUÁRIO inválido.")
               fildNull = true;
            } 

            if(this.usuario.autority){
               this.usuario.role = this.usuario.autority.value;
            }
            
            if(fildNull) this.$toast.add({  severity: 'error', summary: 'Dados inválidos', detail: message, life: 10000 });

            return fildNull;
         },
         onPage(event) {
            this.pagina = event.page;
            this.pageSize = event.rows;
            this.firstRow = event.rows * event.page;
            this.getUsuarios();
         }
      },
      created() {
         this.getRoles();
         this.getUsuarios();
      },
   }
 </script>    