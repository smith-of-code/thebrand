const add = (cart, req) => {
  cart.contents.push(req.body);
  cartSum(cart);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  if (req.body.quantity > 1){
    find.quantity = req.body.quantity;
  } else {
    find.quantity += req.body.quantity;
  }

  cartSum(cart);
  return JSON.stringify(cart, null, 4);
};

const dlt = (cart, req) => {
  let find = cart.contents.find(el => el.id_product === +req.params.id);
  if (find.quantity > 1 && !isNaN(req.body.quantity)){
    find.quantity -= req.body.quantity ;
  }else if (find.quantity <= 1 || req.body.quantity === 'all' ) {
    cart.contents.splice(cart.contents.indexOf(find), 1);
  }
  cartSum(cart);
  return JSON.stringify(cart, null, 4);
};

const cartSum = (cart) =>{

        cart.countGoods =  cart.contents.reduce((sum,carrent) => {return sum + +carrent.quantity} , 0 );
        cart.amount =  cart.contents.reduce((sum,carrent) => {return sum+carrent.price*carrent.quantity} , 0 );
        return cart
};
module.exports = {
  add,
  change,
  dlt
};
