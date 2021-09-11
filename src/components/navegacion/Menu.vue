<template>
    <v-app-bar color="primary" dark>

            <!--v-app-bar-nav-icon></v-app-bar-nav-icon-->

            <v-toolbar-title>SMarket</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon to="/">                
                <v-icon>mdi-home</v-icon>
            </v-btn>

            <v-btn icon to="/productos">                
                <v-icon>mdi-post</v-icon>
            </v-btn>

            <v-btn icon to="/login">                
                <v-icon>mdi-account</v-icon>
            </v-btn>

        </v-app-bar>
</template>