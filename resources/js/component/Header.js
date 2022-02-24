import React from 'react'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="container">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <span className="fs-4">BOOKWORM</span>
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to="#" className="nav-link active" aria-current="page">Home</Link></li>
                    <li className="nav-item"><Link to="/shop" className="nav-link">Shop</Link></li>
                    <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
                    <li className="nav-item"><Link to="/cart" className="nav-link">Cart(0)</Link></li>
                    <li className="nav-item">
                        <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Sign in</button>
                    </li>
                </ul>
            </header>
        </div>
    )
}
