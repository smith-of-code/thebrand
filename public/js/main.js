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
            for (el of data.contents){
                state.cart.contents.push(el)
            }


        }
    },
    // getters:{
    //     givAmount: state => {
    //         return cart.amount
    //     },
    //     givCountGoods: state => {
    //         return cart.countGoods
    //     },
    //     givContents: state => {
    //         return cart.contents
    //     }
    // }

});
const app = new Vue ({
    el: '#app',
   store,
    methods: {

        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
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
        console.log(this);
        this.getJson('/api/cart')
            .then(data => {
                   store.commit('cartLoad', data);
            });
    }
});