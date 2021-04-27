<template>
  <a class="dropdown-item" href="" @click.prevent="editCategory">Move to {{item.name}}</a>
</template>

<script>
export default {
    props: [
        'item'
    ],
    methods: {
        editCategory(){
            this.$emit("editCategory", {id: this.item.id, name: this.item.name});
        }
    }
}
</script>

<style scoped>
a {
   font-size:small; 
}
</style>