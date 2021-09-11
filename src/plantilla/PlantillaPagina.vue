<template>
    <div>
        <Menu></Menu>

        <router-view/>
    </div>
</template>

<script>
import Menu from "../components/navegacion/Menu.vue"

export default {
    components: {Menu}

}
</script>