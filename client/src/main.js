import Vue from 'vue'
import App from './app.vue'
import GoogleSignInButton from 'vue-google-signin-button-directive'

Vue.config.productionTip = false

new Vue({
    GoogleSignInButton,
    render: h => h(App),
}).$mount('#app');