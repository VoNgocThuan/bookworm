import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import "./header.css"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTotalCartQty, setAccessToken, setUserId } from '../../actions/index'

function Header() {
    const [activeMenu, setActiveMenu] = useState('home')
    const access_token = useSelector((state) => state.accessToken.currentAccessToken);
    const user_id = useSelector((state) => state.userId.currentUserId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getLoginData = JSON.parse(localStorage.getItem("loginUserData"));
    const totalCartQty = useSelector((state) => state.totalCartQty.currentTotalCartQty);

    const [state, setState] = useState({
        userFullName: ''
    });

    const [stateCartTotalQty, setStateCartTotalQty] = useState({
        cartTotalQty: 0,
    });

    useEffect(() => {
        getUserFullName();
    }, [user_id])

    useEffect(() => {
        getCartTotalQuantity();
    }, [])

    const getUserFullName = async () => {
        if (getLoginData != null) {
            const resUserFullName = await Axios.get(`http://localhost:8000/api/users/full-name/${getLoginData.data.user_id}`);
            setState({
                userFullName: resUserFullName.data.data,
            })
        }
        else {
            const resUserFullName = await Axios.get(`http://localhost:8000/api/users/full-name/${user_id.newUserId}`);
            setState({
                userFullName: resUserFullName.data.data,
            })
        }
    }

    const getCartTotalQuantity = async () => {
        const res = await Axios.get('http://localhost:8000/api/cart/total-qty');
        dispatch(setTotalCartQty(res.data))
    }

    const signOut = function () {
        if (getLoginData != null) {
            Axios.get('http://localhost:8000/api/logout', {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    "Authorization": `Bearer ${getLoginData.data.access_token}`
                }
            }).then(response => {
                dispatch(setAccessToken(response.data.access_token));
                dispatch(setUserId(response.data.user_id));
                localStorage.removeItem("loginUserData");
                //navigate('/');
            })
        }
        else {
            Axios.post('http://localhost:8000/api/logout', access_token.newAccessToken).then(response => {
                dispatch(setAccessToken(response.data.access_token));
                dispatch(setUserId(response.data.user_id));
                localStorage.removeItem("loginUserData");
                //navigate('/');
            })
        }

    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <img src="http://localhost:8000/assets/bookworm_icon.svg" alt="Image Error" className='img-logo-header' />
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link
                            to="/"
                            className={activeMenu == 'home' ? 'active nav-link' : 'nav-link'}
                            aria-current="page"
                            style={{ textDecoration: 'none' }}
                            onClick={() => { setActiveMenu('home') }}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/shop"
                            className={activeMenu == 'shop' ? 'active nav-link' : 'nav-link'}
                            style={{ textDecoration: 'none' }}
                            onClick={() => { setActiveMenu('shop') }}
                        >
                            Shop
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/about"
                            className={activeMenu == 'about' ? 'active nav-link' : 'nav-link'}
                            style={{ textDecoration: 'none' }}
                            onClick={() => { setActiveMenu('about') }}
                        >
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/cart"
                            className={activeMenu == 'cart' ? 'active nav-link' : 'nav-link'}
                            style={{ textDecoration: 'none' }}
                            onClick={() => { setActiveMenu('cart') }}
                        >
                            {totalCartQty.newTotalCartQty != null ? (
                                <div>Cart({totalCartQty.newTotalCartQty})</div>
                            ) : (
                                <div>Cart(0)</div>
                            )}
                        </Link>
                    </li>
                    {getLoginData != null ? (
                        <li className="nav-item">
                            <div className="dropdown">
                                <button
                                    className="btn main-color text-white dropdown-toggle"
                                    type="button" id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ marginLeft: "5px" }}
                                >
                                    {state.userFullName}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li>
                                        <Link className="dropdown-item" to="#" onClick={signOut}>Sign Out</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link
                                to="#"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                data-bs-whatever="@getbootstrap"
                                className={activeMenu == 'signin' ? 'active nav-link' : 'nav-link'}
                                style={{ textDecoration: 'none' }}
                                onClick={() => { setActiveMenu('signin') }}
                            >
                                Sign in
                            </Link>
                        </li>
                    )}

                </ul>
            </header>
        </div>
    )
}

export default Header;