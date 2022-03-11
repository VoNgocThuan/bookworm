import React from 'react'
import "./footer.css"

export default function Footer() {
    return (
        <div className="py-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-2 col-2 p-3">
                        <img src="http://localhost:8000/assets/bookworm_icon.svg" className="img-fluid d-block" alt="Image Error" />
                    </div>
                    <div className="col-lg-10 col-10 p-3">
                        <p> BOOKWORM </p>
                        <p> ADDRESS </p>
                        <p> 0843339738</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
