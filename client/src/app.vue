<template>
<div>
    <login v-if="page === 'login'" @emitLogin="login" @emitRegister="registrasi" @google="googleSignIn"></login>
    <kanban v-if="page === 'kanban'" @emitLogout="logout" @addTask="addTask" @editTask="editTask" @deleteTask="deleteTask" @editCategory="editCategory" :user="isUser" :categories="categories" :listCategories="listCategories" ></kanban>
</div>
</template>

<script>
import kanban from './views/kanban.vue'
import login from './views/login.vue'
import axios from 'axios'
const baseUrl = 'https://amazing-kanban-app.herokuapp.com';
import regeneratorRuntime from "regenerator-runtime";
import Swal from 'sweetalert2'
export default {
    data(){
        return {
            page: 'login',
            isUser: '',
            categories: [],
            listCategories: []
        }
    },
    components: {
        login,
        kanban
    },
    methods: {
        fetchData(){
            axios({
                method: 'GET',
                url: baseUrl+'/tasks',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(responses =>{
                const {data} = responses;
                this.categories = data;
            })
            .catch(err => {
                console.log(err)
            })

            axios({
                method: 'GET',
                url: baseUrl+'/categories',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(responses =>{
                const {data} = responses;
                this.listCategories = data;
            })
            .catch(err => {
                console.log(err)
            })
        },
        checkLocalStorage(){
            if(localStorage.access_token){
                this.isUser = localStorage.name;
                this.page = 'kanban';
                this.fetchData();
            } else {
                this.page = 'login';
            }
        },
        googleSignIn(){
            Swal.fire('Success', 'Success Login','success');
            this.checkLocalStorage();
        },
        login(user){
            axios({
                method: 'POST',
                url: baseUrl + '/login',
                data: {
                    email: user.email,
                    password: user.password
                }
            })
                .then(response => {
                    const {access_token, name, email} = response.data;
                    localStorage.setItem("access_token", access_token);
                    localStorage.setItem("name", name);
                    localStorage.setItem("email", email);
                    Swal.fire('Succes', 'Success login','success');
                    this.checkLocalStorage();
                })
                .catch(err => {
                    if(!user.email || !user.password){
                        Swal.fire('Error', 'email or password is required','error')
                    }else if (err) {
                        const {message} = err.response.data;
                        Swal.fire('Error', `${message}`,'error')
                    }
                })
        },
        logout(){
            localStorage.removeItem("access_token");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            Swal.fire('Success', 'Success Logout','success');
            this.checkLocalStorage();
        },
        addTask(category){
            (async () => {
                const { value: task } = await Swal.fire({
                    title: `Add Your ${category.name} Task`,
                    input: 'text',
                    inputPlaceholder: 'Enter your Task',
                    inputAttributes: {
                        maxlength: 50,
                        required: true
                    }
                })

                if (task) {
                    axios({
                        url: baseUrl + `/tasks/${category.id}`,
                        method: 'POST',
                        data: {
                            title: task
                        },
                        headers: {
                            access_token: localStorage.access_token
                        }
                    })
                    .then(task => {
                        Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: `Your ${category.name} Task has been saved`,
                                showConfirmButton: false,
                                timer: 1500
                        })
                        this.fetchData();
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })()
        },
        editTask(id){
                axios({
                    url: baseUrl + `/tasks/${id}`,
                    method: 'GET',
                    headers: {
                        access_token: localStorage.access_token
                    }
                })
                .then(task => {
                    (async () => {
                        const { value: input } = await Swal.fire({
                        title: `Edit Your Task`,
                        input: 'text',
                        inputLabel: `Previous Task: \n${task.data.title}`,
                        inputValue: `${task.data.title}`,
                        inputPlaceholder: 'Enter your new Task',
                        inputAttributes: {
                            maxlength: 50,
                            required: true
                        }
                        })

                        if (input) {
                            axios({
                                url: baseUrl + `/tasks/${id}`,
                                method: 'PUT',
                                data: {
                                    title: input
                                },
                                headers: {
                                    access_token: localStorage.access_token
                                }
                            })
                            .then(task => {
                                Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: `Your Task has been edited`,
                                        showConfirmButton: false,
                                        timer: 1500
                                })
                                this.fetchData();
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }
                    })()
                })
                .catch(err => {
                    const {message} = err.response.data;
                    Swal.fire('Error', `${message}`,'error')
                })
        },
        deleteTask(id){
            axios({
                url: baseUrl + `/tasks/${id}`,
                method: 'GET',
                headers: {
                    access_token: localStorage.access_token
                }
            })
            .then(() => {
                Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: "Your Task has been deleted.",
                            icon: 'success',
                            confirmButtonText: 'Ok'
                        })
                        if (result.isConfirmed){
                            axios({
                                url: baseUrl + `/tasks/${id}`,
                                method: 'DELETE',
                                headers: {
                                    access_token: localStorage.access_token
                                }
                            })
                                .then(() => {
                                    this.fetchData();
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                        'Cancelled',
                        'Your Task is safe :)',
                        'error'
                        )
                    }
                })
            })
            .catch((err) => {
                const {message} = err.response.data;
                Swal.fire('Error', `${message}`,'error')
            })

        },
        registrasi(user){
            axios({
                method: 'POST',
                url: baseUrl + '/register',
                data: {
                    username: user.username,
                    email: user.email,
                    password: user.password
                }
            })
                .then(() => {
                    Swal.fire('Success', 'Success sign up','success');
                })
                .catch(err => {
                    if(!user.email || !user.password || !user.username){
                        Swal.fire('Error', 'email or password is required','error')
                    }else if (err) {
                        const {message} = err.response.data;
                        Swal.fire('Error', `${message.join(' and ')}`,'error')
                    }
                })
        },
        editCategory(selectedCategory){
            axios({
                method: 'PATCH',
                url: baseUrl + `/tasks/${selectedCategory.idTask}`,
                data: {
                    categoryId: selectedCategory.id
                },
                headers: {
                    access_token: localStorage.access_token
                }
            })
                .then(() => {
                    Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Your Task has updated to ${selectedCategory.name}`,
                            showConfirmButton: false,
                            timer: 1500
                    })
                    this.fetchData();
                })
                .catch(err => {
                    const {message} = err.response.data;
                    Swal.fire('Error', `${message}`,'error')
                })
        }
    },
    created(){
        this.checkLocalStorage();
    }
}
</script>

<style>

</style>