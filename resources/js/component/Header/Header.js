import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom";
import "./header.css"
import { useSelector } from 'react-redux';

function Header() {
    const access_token = useSelector((state) => state.accessToken.currentAccessToken);
    const user_id = useSelector((state) => state.userId.currentUserId);
    console.log(access_token);
    const [state, setState] = useState({
        userFullName: ''
    });

    useEffect(() => {
        getUserFullName();
    }, [user_id.newUserId])

    const getUserFullName = async () => {
        const resUserFullName = await Axios.get(`http://localhost:8000/api/users/full-name/${user_id.newUserId}`);
        setState({
            userFullName: resUserFullName.data.data,
        })
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <img src="http://localhost:8000/assets/bookworm_icon.svg" alt="Image Error" className='img-logo-header' />
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active" aria-current="page" style={{ textDecoration: 'none' }}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/shop" className="nav-link" style={{ textDecoration: 'none' }}>
                            Shop
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link" style={{ textDecoration: 'none' }}>
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        {access_token != '' ? (
                            <Link to="/cart" className="nav-link" style={{ textDecoration: 'none' }}>
                                Cart(0)
                            </Link>
                        ) : (
                            <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" className="nav-link" style={{ textDecoration: 'none' }}>
                                Cart(0)
                            </Link>
                        )}

                    </li>
                    {access_token != '' ? (
                        <li className="nav-item">
                            <div className="dropdown">
                                <button className="btn main-color text-white dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {state.userFullName}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" href="#">Sign Out</a></li>
                                </ul>
                            </div>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" className="nav-link" style={{ textDecoration: 'none' }}>
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