
Vue.component('cart', {
    props:['dropCart'],
    data(){
        return {
            cart:{
                "amount": 0,
                "countGoods": 0,
                "contents": []
            }
        }
    },
    computed:{
      countGoods(){
          this.cart.countGoods =  this.cart.contents.reduce((sum,carrent) => {return sum + +carrent.quantity} , 0 );
          return this.cart.countGoods;
      },
        amount(){
            this.cart.amount =  this.cart.contents.reduce((sum,carrent) => {return sum+carrent.price*carrent.quantity} , 0 );
            return this.cart.amount;
        }
    },
    methods: {
        addProduct(product){
            const find = this.cart.contents.find(el => el.id_product === product.id_product);

            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                        }
                    });
            } else {
                const prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cart.contents.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            const find = this.cart.contents.find(el => el.id_product === item.id_product);
            if (find){
                this.$parent.dltJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1) {
                            if(find.quantity > 1){
                                find.quantity--;
                            } else {
                                this.cart.contents.splice(this.cart.contents.indexOf(find), 1)
                            }
                        }
                    })
            }
        },
    },
    mounted(){
        this.cart.contents = this.$root.$store.state.cart.contents;
        this.cart.countGoods = this.$root.$store.state.cart.countGoods;
        this.cart.amount = this.$root.$store.state.cart.amount;
    },
    template: `
                <div class="header__right-cart" v-if="dropCart"><a href="shoping-cart.html"><img src="img/cart.svg" alt="cart"></a>
                    <div class="ellipse-cart">{{countGoods}}</div>
                    <div class="drop drop-cart">
                        <div class="drop-box-triangle triangle-cart"></div>
                        <div class="drop-box">
                        <p class="drop-box_empty" v-if="!cart.contents.length">Cart is empty</p>
                        <drop-cart-item class="cart-item"
                        v-for="item of cart.contents"
                        :key="item.id_product"
                        :cart-item="item"
                        @remove="remove">
                        </drop-cart-item>


                            <div class="drop-cart__total" v-if="cart.contents.length">
                                <p>TOTAL</p>
                                <p>$ {{amount.toFixed(2)}}</p>
                            </div>
                            <a href="checkout.html" class="button drop-cart_button" v-if="cart.contents.length">Checkout</a>
                            <a href="shoping-cart.html" class="button drop-cart_button" v-if="cart.contents.length">Go to cart</a>
                        </div>
                    </div>
                </div>
                <div class="cart" v-else>
    <div class="container">
    <div class="cart__grow">
    <div class="cart__grow-box">
    <span class="cart__grow-col cart__grow-col-head">Product Details</span>
<span class="cart__grow-col cart__grow-col-head">unite Price</span>
<span class="cart__grow-col cart__grow-col-head">Quantity</span>
    <span class="cart__grow-col cart__grow-col-head">shipping</span>
    <span class="cart__grow-col cart__grow-col-head">Subtotal</span>
    <span class="cart__grow-col cart__grow-col-head">ACTION</span>
    </div>
    <cart-item class="cart-item"
                        v-for="item of cart.contents"
                        :key="item.id_product"
                        :cart-item="item"
                        @remove="remove">
                        </cart-item>

            </div>
    <div class="cart__buttons">
    <a href="#" class="button cart__form-button"> cLEAR SHOPPING CART</a>
<a href="#" class="button cart__form-button"> cONTINUE sHOPPING</a>
</div>
<form action="#" class="cart__form">
    <fieldset class="cart__form-col">
    <legend class="cart__form-legend">Shipping Adress</legend>
<select name="country" id="country" class="cart__form-input">
    <option value="bangladesh">bangladesh</option>
    <option value="bangladesh">bangladesh</option>
    <option value="bangladesh">bangladesh</option>
    <option value="bangladesh">bangladesh</option>
    </select>
    <input type="text" placeholder="State" class="cart__form-input">
    <input type="text" placeholder="Postcode / Zip" class="cart__form-input">
    <div class="button cart__form-button">get a quote</div>
</fieldset>
<fieldset class="cart__form-col">
    <legend class="cart__form-legend">coupon discount</legend>
<p class="cart__form-descr">
    Enter your coupon code if you have one
</p>
<input type="text" placeholder="State" class="cart__form-input">
    <a class="button cart__form-button">Apply coupon</a>
</fieldset>
<fieldset class="cart__form-col">
    <div class="cart__total">
    <p class="cart__form-subtotal">Sub total <span class="cart__form-subtotal-span">{{amount}}</span></p>
<p class="cart__form-grandtotal">GRAND TOTAL <span
class="cart__form-grandtotal-span pink">{{amount}}</span></p>
<div class="button cart__form-button-pink">proceed to checkout</div>
</div>

</fieldset>
</form>

</div>
</div>
`
});

Vue.component('drop-cart-item', {
    props: ['cartItem'],
    template: `
                            <div class="drop-cart__item">
                                <a href="single-product.html" class="drop-cart__item-image"><img :src="cartItem.image"
                                                                                                 alt="cartItem.product_name"></a>
                                <div class="drop-cart__item-description">
                                    <h3 class="drop-cart__item-title">{{cartItem.product_name}}</h3>
                                    <p class="drop-cart__item-star"><i class="fa fa-star" aria-hidden="true"></i><i
                                            class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star"
                                                                                         aria-hidden="true"></i><i
                                            class="fa fa-star" aria-hidden="true"></i><i class="fa fa-star-half-o"
                                                                                         aria-hidden="true"></i></p>
                                    <p class="drop-cart__item-price">{{cartItem.quantity}}<span class="drop-cart__item-price-span">x</span>
                                        {{cartItem.price}}</p>
                                </div>
                                <span class="drop-cart__item-del" @click="$emit('remove', cartItem)"><i class="fa fa-times-circle"
                                                                     aria-hidden="true"></i></span>
                            </div>


    `
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `

                            <div class="cart__grow-box">
                                <div class="cart__grow-col cart__grow-col-first ">
                                <img class="cart__grow-image" :src="cartItem.image" alt="cartItem.product_name">
                                <div class="cart__grow-description">
                                <a href="single-product.html" class="cart__grow-description-title">{{cartItem.product_name}}</a>
                                <div class="cart__grow-description-param">
                                <p>Color: <span class="cart__grow-description-param-span">{{cartItem.color}}</span></p>
                                <p>Size: <span class="cart__grow-description-param-span">{{cartItem.size}}</span></p>
                                </div>
                                </div>
                                </div>
                                <p class="cart__grow-col">{{cartItem.price}}</p>
                                <p class="cart__grow-col"><input class="cart__grow-col-number" type="number" min="1" max="10" v-model="cartItem.quantity"></p>
                                <p class="cart__grow-col">free</p>
                                <p class="cart__grow-col">{{cartItem.quantity*cartItem.price}}</p>
                                <p class="cart__grow-col cart__grow-col-del" @click="$emit('remove', cartItem)"><i class="fa fa-times-circle" aria-hidden="true"></i>
                                </p>
                            </div>
    `
});
