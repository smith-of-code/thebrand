Vue.component('products', {
    props:['count'],
    data(){
        return {
            products: [],
            filtered: [],

        }
    },
    methods: {
        countRender(){
            if (this.count){
                return this.count
            }else {
                return this.products.length
            }

        },
    },
    mounted(){
        this.$store.dispatch('getJson','/api/catalog')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });

    },
    template: `
        <div class="product-flex">
            <product v-for="item of filtered" v-if="filtered.indexOf(item) < countRender()" :key="item.id_product" :product="item" ></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product'],
    data() {
        return {
           cartAPI: this.$root.$refs.cart,
        };
    },

    template: `
                <div class="product-item">
                    <a href="single-product.html"><img class="product-item__image" :src="product.image"
                                                       alt="product1"></a>
                    <p class="product-item__addtocart" @click="cartAPI.addProduct(product)"><img src="img/cart-white.svg" alt="cart-white">Add to Cart</p>
                    <div class="product-item__text">
                        <a href="single-product.html" class="product-item__title">{{product.product_name}}</a>
                        <p class="product-item__price pink">$ {{product.price.toFixed(2)}}</p>
                    </div>
                </div>
    `
});