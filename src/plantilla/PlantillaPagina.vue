<template>
    <div>
        <h1>Plantilla Página</h1>
        <v-btn to="/">INICIO</v-btn>
        <v-btn to="/productos">PRODUCTOS</v-btn>
        <v-btn to="/login">LOGIN</v-btn>
        <v-btn to="/admin">ADMIN</v-btn>
        <router-view/>
    </div>
</template>