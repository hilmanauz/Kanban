<template>
    <div class="rounded p-2" id="card" :class="{'isUser': task.User.username === isUser}">
        <div class="d-flex justify-content-between">
            <h6>{{task.title}}</h6>
            <a href="" :class="{'convert': task.User.username === isUser}" @click.prevent="deleteTask"><i class="bi bi-x"></i></a>
        </div>
        <div class="d-flex">
            <div class="flex-fill">
                <p>By: {{task.User.username}}</p>
                <p>Updated at {{ task.updatedAt | getDate }}</p>
            </div>
            <div class="flex-fill">
                <div class="d-flex justify-content-end gap-2 pt-1">
                    <a href="" :class="{'convert': task.User.username === isUser}" @click.prevent="editTask"><i class="bi bi-pencil-square"></i></a>
                    <div class="dropdown" :class="{'show': dropdownTask === true}">
                        <a href="" data-toggle="dropdown" aria-haspopup="true" :aria-expanded="active ? 'true' : 'false'" :class="{'convert': task.User.username === isUser}" v-on:click.prevent="changeDropdown" @click.prevent="viewCategory">
                            <i class="bi bi-arrows-move"></i>
                        </a>

                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" :aria-expanded="active ? 'true' : 'false'" :class="{'show': dropdownTask === true}">
                            <category v-for="element in newCategories" :key="element.id" :item="element" @editCategory="editCategory"></category>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import category from './dropdown-item'
export default {
    data(){
        return {
            isUser:localStorage.name,
            dropdownTask:false,
            active:false,
        }
    },
    props:[
        'task',
        'newCategories'
    ],
    components:{
        category
    },
    methods: {
        changeDropdown(){
            if(this.dropdownTask){
                this.dropdownTask = false;
                this.active = false;
            } else {
                this.dropdownTask = true;
                this.active = true;
            }
        },
        editTask(){
            const {id} = this.task;
            this.$emit("editTask", id);
        },
        deleteTask(){
            const {id} = this.task;
            this.$emit("deleteTask", id);
        },
        editCategory(selectedCategory){
            const {id} = this.task;
            selectedCategory.idTask = id;
            this.$emit("editCategory", selectedCategory);
        },
        viewCategory(){
            this.$emit("viewCategory");
        }
    },
    filters: {
        getDate(updated) {
            const date = new Date(updated);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('id', options);
        }
    },
}
</script>

<style scoped>
.isUser {
    background-color: white !important;
    color:black !important;
}

.convert{
    color:grey;
}

.convert:hover{
    color:black;
}
</style>