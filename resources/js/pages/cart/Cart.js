import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./cart.css"
import { useDispatch } from 'react-redux'
import { setTotalCartQty } from '../../actions/index'

export default function Cart() {
  const dispatch = useDispatch();
  const [stateCart, setStateCart] = useState({
    cartList: [],
  });

  const [stateQty, setStateQty] = useState({
    quantity: 0,
  });

  const [stateCartTotal, setStateCartTotal] = useState({
    cartTotal: 0,
  });

  const [stateCartTotalQty, setStateCartTotalQty] = useState({
    cartTotalQty: 0,
  });

  const getCartData = async () => {
    const resCartList = await Axios.get('http://localhost:8000/api/cart');

    setStateCart({
      cartList: resCartList.data
    })
  }

  const getCartTotal = async () => {
    const res = await Axios.get('http://localhost:8000/api/cart/total');

    setStateCartTotal({
      cartTotal: res.data
    })
  }

  const getCartTotalQuantity = async () => {
    const res = await Axios.get('http://localhost:8000/api/cart/total-qty');
    dispatch(setTotalCartQty(res.data))
    setStateCartTotalQty({
      cartTotalQty: res.data
    })
  }

  function updateCartQtyIn($id, $quantity) {
    setStateQty({ quantity: $quantity });
    Axios.put('http://localhost:8000/api/update-cart-increment', {
      id: $id,
      quantity: $quantity
    }).then(
      getCartTotalQuantity()
    )
  }

  function updateCartQtyDe($id, $quantity) {
    setStateQty({ quantity: $quantity });
    Axios.put('http://localhost:8000/api/update-cart-decrement', {
      id: $id,
      quantity: $quantity
    }).then(
      getCartTotalQuantity()
    )
  }

  useEffect(() => {
    getCartData();
    getCartTotal();
    getCartTotalQuantity();
  }, [stateQty.quantity])

  return (
    <div className='container'>
      <h3 className="fs-4 fw-bold d-inline">Your cart: </h3>
      {stateCartTotalQty.cartTotalQty > 1 ? (
        <h3 className="fs-4 fw-bold d-inline">{stateCartTotalQty.cartTotalQty} items</h3>
      ) : (
        <h3 className="fs-4 fw-bold d-inline">{stateCartTotalQty.cartTotalQty} item</h3>
      )}
      <hr className='mt-4 mb-5'></hr>
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
                        <div className='product-info'>
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
          <div class="table-responsive border border-dark border-1 rounded-3">
            <table class="table align-middle text-center">
              <thead>
                <tr>
                  <th scope="col" className='text-center'>Cart Totals</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <h4>${stateCartTotal.cartTotal}</h4>
                  <button
                    type="button"
                    className="btn btn-place-order w-80">
                    Place order
                  </button>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
