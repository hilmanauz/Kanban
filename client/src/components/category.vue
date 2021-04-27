<template>
    <section class="col-3 p-2">
        <div class="d-flex bg-secondary bg-gradient p-2 rounded-top">
            <h5>{{category.name}}</h5>
        </div>
        <div id="backlog-card" class="p-2 rounded-bottom">
            <div class="d-flex flex-column gap-2 overflow-auto mb-2" style="max-height: 74.5vh;">
                <taskcard  v-for="element in category.Tasks" :key="element.id" v-bind:task="element" @editTask="editTask" @deleteTask="deleteTask" @editCategory="editCategory" @viewCategory="viewCategory" :newCategories="newCategories"></taskcard>
            </div>
            <a href="" @click.prevent="addTask">Add a card...</a>
        </div>
    </section>
</template>

<script>
    import taskcard from './taskcard'

export default {
    props: [
        'category',
        'listCategories'
    ],
    data() {
        return {
            task:"",
            newCategories:[]
        }
    },
    components: {
        taskcard
    },
    methods: {
        addTask(){
            this.$emit("addTask", {id: this.category.id, name: this.category.name});
        },
        editTask(id){
            this.$emit("editTask", id)
        },
        deleteTask(id){
            this.$emit("deleteTask", id);
        },
        editCategory(selectedCategory){
            this.$emit("editCategory", selectedCategory);
        },
        viewCategory(){
            this.newCategories = this.listCategories.filter(e => {
                return e.id !== this.category.id;
            })
        }
    },  
}
</script>

<style scoped>
    a {
        color:grey;
    }

    a:hover {
        color:black;
    }
</style>