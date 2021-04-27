<template>
    <div>
      <navbar @emitLogout="logout" :user="user"></navbar>
        <div class="container-fluid" id="kanban">
            <div class="row">
                <category v-for="element in categories" :key="element.id" v-bind:category="element" @addTask="addTask" @editTask="editTask" @deleteTask="deleteTask" @editCategory="editCategory" :listCategories="listCategories"></category>
            </div>
        </div> 
    </div>
</template>

<script>
    import category from '../components/category'
    import navbar from '../components/navbar'
export default {
    data(){
        return {
            
        }
    },
    methods: {
        logout(){
            this.$emit("emitLogout");
        },
        addTask(category){
            this.$emit("addTask", category);
        },
        editTask(id){
            this.$emit("editTask", id);
        },
        deleteTask(id){
            this.$emit("deleteTask", id);
        },
        editCategory(selectedCategory){
            this.$emit("editCategory", selectedCategory);
        }
    },
    components: {
        category,
        navbar
    },
    props: [
        'user',
        'categories',
        'listCategories'
    ]
}
</script>

<style>

</style>