import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./bookdetail.css"

export default function BookDetail() {
    let { id } = useParams();
    const [state, setState] = useState({
        book: {},
    });
    useEffect(() => {
        getBook();
    }, [])
    const getBook = async () => {
        const res = await Axios.get(`http://127.0.0.1:8000/api/books/${id}`);
        setState({
            book: res.data.data
        })
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-8'>
                    <div className='row border-book-detail rounded-3 border-1'>
                        <div className='col-md-4 p-0'>
                            <img src={"http://127.0.0.1:8000/bookcover/" + state.book.book_cover_photo + ".jpg"} className="card-img-top" alt="abc" />
                            <p className='fl-right d-inline'>By <h6 className='d-inline'>{state.book.author?.author_name}</h6></p>
                        </div>
                        <div className='col-md-8'>
                            <div className='mt-3'>
                                <h4>{state.book.book_title}</h4>
                                <p>{state.book.book_summary}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='border-book-detail rounded-3 border-1'>
                        <div className='bg-quantity px-5 text-white border-book-detail rounded-3 border-1'>
                            <div className='d-inline text-decoration-line-through fw-light' style={{ marginRight: "10px" }}>
                                {state.book.book_price}
                            </div>
                            {/* {state.discount.length === 0 ? null : } */}
                            <div className='d-inline fw-bold fs-4'>
                                {/* {state.discount.discount_price} */}
                                $20
                            </div>
                        </div>
                        <div className='mt-5 px-5'>
                            <h5>Quantity</h5>
                            <div className="bm-flex bg-quantity text-white height-quantity px-2 rounded-3 border-1">
                                <div className='fs-2'>-</div>
                                <div>1</div>
                                <div className='fs-2'>+</div>
                            </div>
                            <button type="button" className="btn text-white bg-quantity mt-4 w-100 mb-5">Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-8">
                    <div className="border-book-detail rounded-3 border-1 py-4 px-3">
                        <h3 className="fs-4 fw-bold d-inline">Customer Reviews </h3>
                        <div className='d-inline fw-light'>(Filltered by 5 star)</div>
                        <div className="d-flex">
                            <div>
                                <span className="fs-3 fw-bold">4.6</span>
                                <div className='star-mr text-decoration-underline fw-bold'>(3.134)</div>
                            </div>
                            <div>
                                <span className="fs-3 fw-bold">Star</span>
                                <div>
                                    <span className='px-1 text-decoration-underline'>5 star(200)</span> |
                                    <span className='px-1 text-decoration-underline'>4 star(200)</span> |
                                    <span className='px-1 text-decoration-underline'>3 star(200)</span> |
                                    <span className='px-1 text-decoration-underline'>2 star(200)</span> |
                                    <span className='px-1 text-decoration-underline'>1 star(200)</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="mt-3" style={{ marginRight: "20px" }}>Showing 1-12 of 3134 reviews</p>
                            <div className='d-flex mt-3'>
                                <div className="dropdown" style={{ marginRight: "10px" }}>
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sort by on sale
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                    </ul>
                                </div>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        Show 20
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a className="dropdown-item" href="#">Action</a></li>
                                        <li><a className="dropdown-item" href="#">Another action</a></li>
                                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <h4 className='fw-bold fs-5'>Review Title</h4>
                            <p>I throw myself down among the tall grass by the trickling stream; and, as I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks.</p>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link" href="#" tabindex="-1">Previous</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="border-book-detail rounded-3 border-1 p-2">
                        <h3 className="fs-4 fw-bold">Write a review</h3>
                        <form className="form-review">
                            <div className="form-group">
                                <label for="exampleFormControlInput1">
                                    Add Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="title"
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">
                                    Detail
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlSelect1">
                                    Example select
                                </label>
                                <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                >
                                    <option>1 star</option>
                                    <option>2 star</option>
                                    <option>3 star</option>
                                    <option>4 star</option>
                                    <option>5 star</option>
                                </select>
                            </div>
                            <button className="btn submit-review">123</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
