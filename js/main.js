const API = 'jsons';

const app = new Vue ({
    el: '#app',
    methods: {
        getJson(url){
            return fetch(url)
                .then(data => data.json())
                .catch(error => console.log(error))
        },
    },
    mounted() {
        console.log(this);
    }
});