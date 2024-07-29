<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-2">
                    <div class="gap-3">
                        <span class="block text-500 font-medium mb-3">{{ moeda.BTCBRL.name }}</span>
                    </div>
                    <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-bitcoin text-yellow-500 text-xl"></i>
                    </div>
                </div>  
                <div class="mb-3 text-900 font-medium text-lg">
                    <div class="flex justify-content-between text-green-500 m-1">
                        <span>Compra </span>
                        <span>R$: {{ moeda.BTCBRL.ask }}</span> 
                    </div>

                    <div class="flex justify-content-between text-blue-500 m-1">
                        <span>Venda </span>
                        <span>R$: {{ moeda.BTCBRL.bid}}</span>
                    </div>
                </div>     
                <div class="flex justify-content-between m-2">
                    <span class="block text-500 font-medium">Variação</span>
                    <span class="flex text-right font-medium" :class="{'text-green-300': !moeda.BTCBRL.alta, 'text-red-300': moeda.BTCBRL.alta}">                  
                        {{ moeda.BTCBRL.pctChange }}  
                        <i v-show="!moeda.BTCBRL.alta" class="pi pi-arrow-up text-sm ml-2 mt-1"></i>
                        <i v-show="moeda.BTCBRL.alta"  class="pi pi-arrow-down text-sm ml-2 mt-1"></i>                    
                    </span>
                </div>
            </div>
        </div>
        
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-2">
                    <div class="gap-3">
                        <span class="block text-500 font-medium mb-3">{{ moeda.USDBRL.name }}</span>
                    </div>
                    <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-yellow-500 text-xl"></i>
                    </div>
                </div>  
                <div class="mb-3 text-900 font-medium text-lg">
                    <div class="flex justify-content-between text-green-500 m-1">
                        <span>Compra </span>
                        <span>R$: {{ moeda.USDBRL.ask }}</span> 
                    </div>

                    <div class="flex justify-content-between text-blue-500 m-1">
                        <span>Venda </span>
                        <span>R$: {{ moeda.USDBRL.bid}}</span>
                    </div>
                </div>     
                <div class="flex justify-content-between m-2">
                    <span class="block text-500 font-medium">Variação</span>
                    <span class="flex text-right font-medium" :class="{'text-green-300': !moeda.USDBRL.alta, 'text-red-300': moeda.USDBRL.alta}">                  
                        {{ moeda.USDBRL.pctChange }}  
                        <i v-show="!moeda.USDBRL.alta" class="pi pi-arrow-up text-sm ml-2 mt-1"></i>
                        <i v-show="moeda.USDBRL.alta"  class="pi pi-arrow-down text-sm ml-2 mt-1"></i>                    
                    </span>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-2">
                    <div class="gap-3">
                        <span class="block text-500 font-medium mb-3">{{ moeda.EURBRL.name }}</span>
                    </div>
                    <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-yellow-500 text-xl"></i>
                    </div>
                </div>  
                <div class="mb-3 text-900 font-medium text-lg">
                    <div class="flex justify-content-between text-green-500 m-1">
                        <span>Compra </span>
                        <span>R$: {{ moeda.EURBRL.ask }}</span> 
                    </div>

                    <div class="flex justify-content-between text-blue-500 m-1">
                        <span>Venda </span>
                        <span>R$: {{ moeda.EURBRL.bid}}</span>
                    </div>
                </div>     
                <div class="flex justify-content-between m-2">
                    <span class="block text-500 font-medium">Variação</span>
                    <span class="flex text-right font-medium" :class="{'text-green-300': !moeda.EURBRL.alta, 'text-red-300': moeda.EURBRL.alta}">                  
                        {{ moeda.EURBRL.pctChange }}  
                        <i v-show="!moeda.EURBRL.alta" class="pi pi-arrow-up text-sm ml-2 mt-1"></i>
                        <i v-show="moeda.EURBRL.alta"  class="pi pi-arrow-down text-sm ml-2 mt-1"></i>                    
                    </span>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-3 ">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-2">
                    <div class="gap-3">
                        <span class="block text-500 font-medium mb-3">{{ moeda.ARSBRL.name }}</span>
                    </div>
                    <div class="flex align-items-center justify-content-center border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-yellow-500 text-xl"></i>
                    </div>
                </div>  
                <div class="mb-3 text-900 font-medium text-lg">
                    <div class="flex justify-content-between text-green-500 m-1">
                        <span>Compra </span>
                        <span>R$: {{ moeda.ARSBRL.ask }}</span> 
                    </div>

                    <div class="flex justify-content-between text-blue-500 m-1">
                        <span>Venda </span>
                        <span>R$: {{ moeda.ARSBRL.bid}}</span>
                    </div>
                </div>     
                <div class="flex justify-content-between m-2">
                    <span class="block text-500 font-medium">Variação</span>
                    <span class="flex text-right font-medium" :class="{'text-green-300': !moeda.ARSBRL.alta, 'text-red-300': moeda.ARSBRL.alta}">                  
                        {{ moeda.ARSBRL.pctChange }}  
                        <i v-show="!moeda.ARSBRL.alta" class="pi pi-arrow-up text-sm ml-2 mt-1"></i>
                        <i v-show="moeda.ARSBRL.alta"  class="pi pi-arrow-down text-sm ml-2 mt-1"></i>                    
                    </span>
                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="card mb-0">
                <h5 class="block text-500 font-medium">Vendas</h5><hr />
            </div>
        </div>    

        <div class="col-12">
            <div class="card mb-0">
                <h5 class="block text-500 font-medium">Estoque</h5><hr />
            </div>
        </div>   

        <div class="col-12">
            <div class="card mb-0">
                <h5 class="block text-500 font-medium">Clientes</h5><hr />
            </div>
        </div>   

        <div class="col-12">
            <div class="card">                  
                <h5 class="block text-500 font-medium">Próximos Feriados</h5><hr />
                <Carousel :value="feriados" :numVisible="5" :numScroll="3" :circular="false">                  
                    <template #item="product">
                        <div class="border-round m-1 text-center p-0" style="border: 1px solid var(--surface-d)">                           
                            <div class="card">
                                <h5  class="font-bold text-red-500">{{ product.data.name }}</h5>
                                <h6 class="mt-0 mb-3">{{ product.data.data }}</h6>
                                <span class="mt-0 mb-3">{{ product.data.type }}</span> 
                            </div> 
                        </div>
                    </template>
                </Carousel>
            </div>
        </div>
    </div>
</template>

<script>
    import services from '@service/DashboardServices';
    import Formatacao from '../utilities/Formatacao';
    export default {
        data() {
            return {
                moeda: {
                    USDBRL: {
                        name: 'moeda',
                        ask: '0',
                        bid: '0',
                        pctChange: 0,
                        alta: false
                    },

                    EURBRL: {
                        name: 'moeda',
                        ask: '0',
                        bid: '0',
                        pctChange: 0,
                        alta: false
                    },

                    ARSBRL: {
                        name: 'moeda',
                        ask: '0',
                        bid: '0',
                        pctChange: 0,
                        alta: false
                    },

                    BTCBRL: {
                        name: 'moeda',
                        ask: '0',
                        bid: '0',
                        pctChange: 0,
                        alta: false
                    }
                },

                feriados: [],
            }
        },
        mounted() {
            this.getCotacao();
            this.getFeriados();
        },
        methods: {
            getCotacao() {
                services.getCotacao()
                    .then(({ data }) => {
                        if(data) {
                            this.moeda = data; 
                            if(this.moeda.ARSBRL.pctChange < 0 ) this.moeda.ARSBRL.alta = true;
                            if(this.moeda.USDBRL.pctChange < 0 ) this.moeda.USDBRL.alta = true;
                            if(this.moeda.EURBRL.pctChange < 0 ) this.moeda.EURBRL.alta = true;                           
                            if(this.moeda.BTCBRL.pctChange < 0 ) this.moeda.BTCBRL.alta = true;
                        }
                    }) 
                    .catch(error => {
                        
                    });
            },
            getFeriados(){
                services.getFeriados() 
                    .then(({ data }) => {
                        if(data) {
                            data.map(item => {
                                let feriado = new Date(item.date);
                                let feriadoMonth = String(feriado.getMonth() + 1).padStart(2,'0');
                                let feriadoYear = String(feriado.getFullYear());

                                let hoje = new Date();
                                let presentMonth = String(hoje.getMonth() + 1).padStart(2,'0');
                                let presentYear =  String(hoje.getFullYear());
                               
                                if(feriadoYear === presentYear && feriadoMonth > presentMonth){
                                    item['data'] = Formatacao.formatDate(item.date, 'DD/MM/YYYY'),
                                    this.feriados.push(item);
                                }
                               
                               
                            })
                        }                      
                    }) 
                    .catch(error => {
                    });
            }
        }
    }
</script>