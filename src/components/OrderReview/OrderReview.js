import React, { Component } from 'react'
import './OrderReview.css'

import giphy from '../../images/giphy.gif'
import fakeData from '../../fakeData'

import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager'

class OrderReview extends Component {
  constructor(){
    super();
    this.state = {
      items: [],
      isOrdered: null
    }
    this.removeItem = this.removeItem.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount(){
    var savedCart = getDatabaseCart();
    var selectedIds = Object.keys(savedCart);

    var savedItems = selectedIds.map(id => {
      var item = fakeData.find(item => item.id === id)
      item.quantity = savedCart[id]
      return item;
    })

    this.setState({
      items: savedItems
    })
  }

  removeItem(id){
    var remainingItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: remainingItems
    })

    removeFromDatabaseCart(id);
  }

  placeOrder(){
    this.setState({
      isOrdered: true
    })
  }

  render(){

    var displayHtml = null;
    if (this.state.isOrdered){
      displayHtml = <img src={giphy} />
    } else {
      displayHtml = this.state.items
        .map(item =>
          <li>{item.name} Quantity: {item.quantity}
            <button onClick={() => this.removeItem(item.id)}>remove</button>
          </li>)
    }

    return(
      <div>
        <button onClick={() => this.placeOrder()}>Place Order</button>
        {displayHtml}
      </div>
    );
  }
}

export default OrderReview;
