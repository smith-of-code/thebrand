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