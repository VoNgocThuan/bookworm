import React from 'react'
import { Link } from "react-router-dom";
import "./header.css"

export default function Header() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <img src="http://localhost:8000/assets/bookworm_icon.svg" alt="Image Error" className='img-logo-header'/>
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
                        <Link to="/cart" className="nav-link" style={{ textDecoration: 'none' }}>
                            Cart(0)
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="#" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap" className="nav-link" style={{ textDecoration: 'none' }}>
                            Sign in
                        </Link>
                    </li>
                </ul>
            </header>
        </div>
    )
}
