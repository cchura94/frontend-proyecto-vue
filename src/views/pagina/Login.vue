<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>INGRESAR</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="formLogin" v-model="valido" lazy-validation>
                                <v-text-field 
                                    v-model="usuario.correo" 
                                    prepend-icon="mdi-email" 
                                    name="email" 
                                    label="Ingrese su Correo" 
                                    type="email"
                                    :rules="correoRules">
                                </v-text-field>
                                <v-text-field 
                                    v-model="usuario.password" 
                                    id="password" 
                                    prepend-icon="mdi-lock" 
                                    name="password" 
                                    label="Contraseña" 
                                    type="password"
                                    :rules="[v => !!v || 'La Contraseña es obligatorio']">
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="ingresar()" :disabled="!valido">Ingresar</v-btn>
                        </v-card-actions>

                        {{ usuario }} - {{valido}}
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-snackbar
        v-model="snackbar"
        timeout="3000"
        :value="true"
        color="red"
        absolute
        right
        rounded="pill"
        top
        >
        {{ snackbar_text }}.
        </v-snackbar>
    </v-content>
</template>

<script>
import axios from "axios"

export default {
    data(){
        return {
            usuario: {
                correo: "",
                password: ""
            },
            snackbar: false,
            snackbar_text: '',
            correoRules: [
                v => !!v || 'El Correo es obligatorio',
                v => /.+@.+\..+/.test(v) || 'El correo no es Valido',
            ],
            valido: true
        }
    },
    methods: {
        async ingresar(){
            if(this.$refs.formLogin.validate()){
                let {data} = await axios.post("http://127.0.0.1:3000/api/login", this.usuario)
                if(data.error){
                    this.snackbar = true
                    this.snackbar_text = data.mensaje
                }else{
                    localStorage.setItem("authuser", JSON.stringify(data))
                    this.$router.push({ name: 'Admin'})
                }
                console.log(data)
            }

        },

    }
}
</script>