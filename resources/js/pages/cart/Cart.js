import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./cart.css"

export default function Cart() {

  const [stateCart, setStateCart] = useState({
    cartList: [],
  });

  const [stateQty, setStateQty] = useState({
    quantity: 0,
  });

  const getCartData = async () => {
    const resCartList = await Axios.get('http://localhost:8000/api/cart');

    setStateCart({
      cartList: resCartList.data
    })
  }

  function updateCartQtyIn($id, $quantity) {
    setStateQty({ quantity: $quantity });
    Axios.put('http://localhost:8000/api/update-cart-increment', {
      id: $id,
      quantity: $quantity
    })
  }

  function updateCartQtyDe($id, $quantity) {
    setStateQty({ quantity: $quantity });
    Axios.put('http://localhost:8000/api/update-cart-decrement', {
      id: $id,
      quantity: $quantity
    })
  }

  useEffect(() => {
    getCartData();
  }, [stateQty.quantity])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-8'>
          <div class="table-responsive border border-dark border-1 rounded-3">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              {Object.keys(stateCart.cartList).map(
                (item, i) => (
                  <tbody>
                    <tr key={i}>
                      <td colSpan={3}>
                        <div className='d-inline'>
                          <img
                            src={"http://localhost:8000/assets/bookcover/" + stateCart.cartList[item].attributes.image + ".jpg"}
                            className="rounded-start"
                            style={{ width: "130px", height: "130px" }}
                            alt="Image Error"
                          />
                        </div>
                        <div className='d-inline' style={{ marginLeft: "10px" }}>
                          <h5 className='d-inline'>
                            {stateCart.cartList[item].name}
                          </h5>
                          <p>
                            {stateCart.cartList[item].attributes.author_name}
                          </p>
                        </div>
                      </td>
                      <td>
                        ${stateCart.cartList[item].price}
                      </td>
                      <td>
                        <div
                          className="input-group"
                          style={{ width: "120px" }}
                        >
                          <button
                            className="btn btn-qty"
                            onClick={() => {
                              updateCartQtyDe(stateCart.cartList[item].id, stateCart.cartList[item].quantity)
                            }}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="item-count form-control"
                            disabled
                            value={stateCart.cartList[item].quantity}
                          />
                          <button
                            className="btn btn-qty"
                            onClick={() => {
                              updateCartQtyIn(stateCart.cartList[item].id, stateCart.cartList[item].quantity)
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        ${stateCart.cartList[item].price * stateCart.cartList[item].quantity}
                      </td>
                    </tr>
                  </tbody>
                )
              )}
            </table>
          </div>
        </div>
        <div className='col-md-4'>

        </div>
      </div>
    </div>
  )
}
