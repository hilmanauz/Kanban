<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-2">
        <div class="container">
            <a class="navbar-brand" href="#">KanBan-App</a>
            <div class="form-inline no-p navbar-right">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown" :class="{'show': dropdown === true}">
                <a class="nav-link dropdown-toggle" href="" data-bs-toggle="dropdown"  :aria-expanded="active ? 'true' : 'false'" v-on:click.prevent="changeDropdown" >{{user}}</a>
                <ul class="dropdown-menu" :class="{'show': dropdown === true}">
                    <li><a class="dropdown-item" href="" @click.prevent="logout">Logout</a></li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data(){
        return {
            dropdown:false,
            active:false
        }
    },
    methods: {
        changeDropdown(){
            if(this.dropdown){
                this.dropdown = false;
                this.active = false;
            } else {
                this.dropdown = true;
                this.active = true;
            }
        },
        logout(){
            this.$emit('emitLogout');
        }
    },
    props: [
        'user'
    ]
}
</script>

<style scoped>
i {
    color:white;
}
</style>