const store = new Vuex.Store({
    state: {
        cart: {
            "amount": 0,
            "countGoods": 0,
            "contents":[]
        },
    },
    mutations:{
        cartLoad(state, data){
            state.cart.amount = data.amount;
            state.cart.countGoods = data.countGoods;
            state.cart.contents = data.contents;
        },
        quantityChange(state, num){
            console.log(num);
        }


    },
    actions:{
        cartInit(state, url){
            this.dispatch('getJson', '/api/cart')
                .then(data =>{
                    this.commit('cartLoad', data)
                })
        },
        getJson(state, url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },

    },
    getters:{
        amount: state => {
            return state.cart.amount
        },
        countGoods: state => {
            return state.cart.countGoods
        },
        contents: state => {
            return state.cart.contents
        }
    }

});
const app = new Vue ({
    el: '#app',
   store,
    methods: {
        getJson(url){
            console.log(url);
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },

        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        dltJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
    },
    mounted() {
                   store.dispatch('cartInit', '/api/cart');
    }
});