import React, { Component } from 'react'

class Cart extends Component {
  constructor(props){
    super(props);
    var itemCost = this.props.cart.reduce( (sum, item) => {
      return sum + item.price;
    }, 0)
  }

  render(){
    const cart = this.props.cart;

    return(
        <div>
          <h4>Order summary</h4>
          <p>Items ordered: {cart.length}</p>
        </div>
    );
  }
}

export default Cart;
