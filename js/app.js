const { createApp } = Vue;

createApp({
    data() {
        return {
            message: 'Hello World from Vue.js!',
            description: 'This is a simple Vue.js application with separated CSS and JS files.'
        }
    },
    methods: {
        changeMessage() {
            this.message = 'You clicked the button!';
            this.description = 'The message has been changed dynamically using Vue.js!';
        }
    },
    mounted() {
        console.log('Vue.js app has been mounted successfully!');
    }
}).mount('#app');
