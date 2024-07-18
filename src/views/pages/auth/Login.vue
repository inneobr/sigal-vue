<template>
    <div class="pages-body login-page flex flex-column" id="login-background">
        <div class="flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
            <div class="col-12 md:col-8 xl:col-4 align-items-center justify-content-center">        
                <div class="pages-body login-page flex flex-column">
                    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                        <div class="text-center mb-5">
                            <img src="/favicon.png" alt="Image" height="50" class="mb-3" />
                            <div class="text-900 text-3xl font-medium mb-3">INNEO SISTEMAS</div>
                        </div>

                        <Form @submit="handleLogin" :validation-schema="schema">
                            <div class="p-inputgroup">
                                <span class="p-inputgroup-addon">
                                    <i class="pi pi-user"></i>
                                </span>
                                <span class="p-float-label">
                                    <Field name="username" class="p-inputtext p-component" placeholder="Usuário"/>
                                    <ErrorMessage name="username" class="error-feedback alert-danger" />
                                </span>
                            </div>
                            
                            <div class="p-inputgroup mt-3">
                                <span class="p-inputgroup-addon">
                                    <i class="pi pi-lock"></i>
                                </span>
                                <span class="p-float-label">
                                    <Field name="password" class="p-inputtext p-component" type="password" placeholder="Senha"/>
                                    <ErrorMessage name="password" class="error-feedback alert-danger" />
                                </span>
                            </div>

                            <Message v-if="message" severity="error" icon="pi pi-exclamation-circle" class="flex align-items-center justify-content-center" :closable="false">{{ message }}</Message>
                          
                            <div class="flex align-items-center justify-content-between mt-3 mb-6">
                                <div class="flex align-items-center">
                                </div>
                                <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Recuperar senha?</a>
                            </div>

                            <button class="flex justify-content-center p-button p-component w-full " :disabled="loading">
                                <i class="pi pi pi-user" style="margin-right: 10px;"/>
                                <span>ENTRAR</span>
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Form, Field, ErrorMessage } from "vee-validate";
    import * as yup from "yup";
    export default {
        components: {
            Form,
            Field,
            ErrorMessage
        },

        data() {
            const schema = yup.object().shape({
            username: yup.string().required("Campo obrigatório!"),
            password: yup.string().required("Campo obrigatório!"),
            });

            return {
                loading: false,
                message: "",
                schema,                
            };
        },

        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            },
        },

        created() {
            if (this.loggedIn) {
                this.$router.push("/auth/login");
            }
        },

        methods: {
            handleLogin(user) {                
                this.loading = true;              
                this.$store.dispatch("auth/login", user)
                .then(() => {
                    this.$router.push("/");
                },
                (error) => {
                    this.loading = false;
                    this.message =
                        (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                        error.message ||
                        error.toString();

                        this.getMessage();
                        
                    }
                );
                
            },

            getMessage(){
                if(this.message == 'Bad credentials'){
                    return this.message = "Usuário ou senha inválidos."
                }

                if(this.message === "Cannot read properties of undefined (reading 'status')"){
                    return this.message = "Login indisponível, tente mais tarde";
                }
            }
        }

    }
</script>