import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./cart.css"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { setTotalCartQty } from '../../actions/index'
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const access_token = useSelector((state) => state.accessToken.currentAccessToken);

  const [stateCart, setStateCart] = useState({
    cartList: [],
  });

  const [stateCartUnavailable, setStateCartUnavailable] = useState({
    cartListUnavailable: [],
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

  const [isError, setIsError] = useState(undefined);

  const getLoginData = JSON.parse(localStorage.getItem("loginUserData"));

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

  async function updateCartQtyIn($id, $quantity) {
    setStateQty({ quantity: $quantity });
    await Axios.put('http://localhost:8000/api/cart/update-cart-increment', {
      id: $id,
      quantity: $quantity
    }).then(
      getCartTotalQuantity()
    )
  }

  async function updateCartQtyDe($id, $quantity) {
    setStateQty({ quantity: $quantity });
    await Axios.put('http://localhost:8000/api/cart/update-cart-decrement', {
      id: $id,
      quantity: $quantity
    }).then(
      getCartTotalQuantity()
    )
  }

  async function removeCartItem($id) {
    await Axios.post('http://localhost:8000/api/cart/remove', {
      id: $id
    }).then(
      getCartTotalQuantity(),
      getCartData()
    )
  }

  async function placeOrder() {
    const res = await Axios.post('http://localhost:8000/api/orders', {
      user_id: getLoginData.data.user_id,
      order_amount: stateCartTotal.cartTotal,
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        "Authorization": `Bearer ${getLoginData.data.access_token}`
      }
    })
    checkStatusPlaceOrder(res.data);
    removeCartItemUnavailable(res.data)
  }

  function checkStatusPlaceOrder($value) {
    if ($value == []) {
      setIsError(false);
      setTimeout(() => {
        setIsError(undefined);
      }, 10000)
      setTimeout(() => {
        navigate('/');
      }, 11000)
    } else {
      setStateCartUnavailable({ cartListUnavailable: $value })
      setIsError(true);
      setTimeout(() => {
        setIsError(undefined);
      }, 5000)
    }
  }

  function removeCartItemUnavailable($value) {
    Object.keys($value).map((item) => (
      removeCartItem($value[item].book_id)
    ))
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
        {isError == false ? (
          <div className="alert alert-success" role="alert">
            Place order successfully.
          </div>
        ) : isError == true ? (
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Error</h4>
            {Object.keys(stateCartUnavailable.cartListUnavailable).map((item, i) => (
              <p key={i}>
                Book {stateCartUnavailable.cartListUnavailable[item].book_name},
                Price {stateCartUnavailable.cartListUnavailable[item].price}$ is unavailable!
              </p>
            ))}
            <hr />
            <p className="mb-0">Please choose another book.</p>
          </div>
        ) : (
          <div></div>
        )}
        <div className='col-md-8'>
          <div className="table-responsive border border-dark border-1 rounded-3">
            <table className="table table-hover align-middle">
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
                  stateCart.cartList[item].quantity == 0 ? (
                    <tbody></tbody>
                  ) : (
                    <tbody>
                      <tr key={i}>
                        <td colSpan={3}>
                          <Link to={`/books/${stateCart.cartList[item].id}`} style={{ textDecoration: 'none' }}>
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
                          </Link>
                        </td>
                        {stateCart.cartList[item].price != stateCart.cartList[item].attributes.old_price ? (
                          <td>
                            <h5>
                              ${stateCart.cartList[item].price}
                            </h5>
                            <p className='text-decoration-line-through old-price'>
                              ${stateCart.cartList[item].attributes.old_price}
                            </p>
                          </td>
                        ) : (
                          <td>
                            <h5>
                              ${stateCart.cartList[item].price}
                            </h5>
                          </td>
                        )}
                        <td>
                          <div
                            className="input-group"
                            style={{ width: "120px" }}
                          >
                            <button
                              className="btn btn-qty"
                              onClick={() => {
                                if (stateCart.cartList[item].quantity == 0) {
                                  removeCartItem(stateCart.cartList[item].id)
                                }
                                else {
                                  updateCartQtyDe(stateCart.cartList[item].id, stateCart.cartList[item].quantity)
                                }
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
                            {stateCart.cartList[item].quantity == 8 ? (
                              <button
                                className="btn btn-secondary"
                                disabled
                              >
                                +
                              </button>
                            ) : (
                              <button
                                className="btn btn-qty"
                                onClick={() => {
                                  updateCartQtyIn(stateCart.cartList[item].id, stateCart.cartList[item].quantity)
                                }}
                              >
                                +
                              </button>
                            )}
                          </div>
                        </td>
                        <td>
                          ${Math.round((stateCart.cartList[item].price * stateCart.cartList[item].quantity) * 10) / 10}
                        </td>
                      </tr>
                    </tbody>
                  )
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
                  {getLoginData != null ? (
                    <button
                      type="button"
                      className="btn btn-place-order w-80"
                      onClick={() => placeOrder()}
                    >
                      Place order
                    </button>
                  ) : (
                    <Link
                      to="#"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@getbootstrap"
                      className="nav-link"
                      style={{ textDecoration: 'none' }}
                    >
                      <button
                        type="button"
                        className="btn btn-place-order w-80"
                        onClick={() => placeOrder()}
                      >
                        Place order
                      </button>
                    </Link>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}
