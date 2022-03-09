import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./home.css"

export default function Home() {
    const [state, setState] = useState({
        onsaleBookList: [],
        recommendedBookList: [],
        popularBookList: []
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        getBooksData();
    }, [])

    const getBooksData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const resOnSaleBooks = await Axios.get('http://localhost:8000/api/books/onsale');
            const resRecommendedBooks = await Axios.get('http://localhost:8000/api/books/recommended');
            const resPopularBooks = await Axios.get('http://localhost:8000/api/books/popular');
            setState({
                onsaleBookList: resOnSaleBooks.data.data,
                recommendedBookList: resRecommendedBooks.data.data,
                popularBookList: resPopularBooks.data.data
            })
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    }

    // const renderListItem = (bookList) => {
    //     let xhtml = [];
    //     xhtml = bookList.map((item) => {
    //         return <div className="col-md-3" >
    //             <div className='card border border-1'>
    //                 <img src={"http://127.0.0.1:8000/bookcover/" + item.book_cover_photo + ".jpg"} className="card-img-top" alt="https://static.pingendo.com/cover-moon.svg" />
    //                 <div className="card-body">
    //                     <h5 className="card-title">{item.book_title}</h5>
    //                     <p className="card-text">{item.book_summary}</p>
    //                     <a href="#" className="btn btn-primary">Go somewhere</a>
    //                 </div>
    //             </div>
    //         </div>
    //     })
    //     return xhtml
    // }
    return (
        <div className='container'>
            <section>
                <div className='row'>
                    <h4 className='col-md-6'>On Sale</h4>
                    <div className="dropdown col-md-6 p-bottom d-flex justify-content-end">
                        <button className="btn main-color text-white dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            View All
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
                {isLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-info" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div id="carouselExampleControls" className="carousel slide border border-1" data-bs-ride="carousel">
                        <div className="carousel-inner mg-auto w-80 p-3">
                            <div className="carousel-item active">
                                <div className='row'>
                                    {state.onsaleBookList?.slice(0, 4).map((item, i) => {
                                        if (item.book_cover_photo == null) {
                                            item.book_cover_photo = "bookNull";
                                        }
                                        return (
                                            <div className="col-md-3" key={i}>
                                                <Link to={`books/${item.book_id}`} style={{ textDecoration: 'none' }}>
                                                    <div className='card border border-1 h-100'>
                                                        <img src={"http://localhost:8000/assets/bookcover/" + item.book_cover_photo + ".jpg"} className="card-img-top img-book-card" alt="Image Error" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.book_title}</h5>
                                                            <p className="card-text">{item.author_name}</p>
                                                        </div>
                                                        <div className='card-footer text-white'>
                                                            {item.discount_price != null ? (
                                                                <div>
                                                                    <div className='d-inline text-decoration-line-through fw-light' style={{ marginRight: "5px" }}>
                                                                        ${item.book_price}
                                                                    </div>
                                                                    <div className='d-inline fw-bold'>
                                                                        ${item.discount_price}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className='fw-bold'>
                                                                        ${item.book_price}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className='row'>
                                    {/* {renderListItem(state.bookList)} */}
                                    {state.onsaleBookList?.slice(4, 8).map((item, i) => {
                                        if (item.book_cover_photo == null) {
                                            item.book_cover_photo = "bookNull";
                                        }
                                        return (
                                            <div className="col-md-3" key={i}>
                                                <Link to={`books/${item.book_id}`} style={{ textDecoration: 'none' }}>
                                                    <div className='card border border-1 h-100'>
                                                        <img src={"http://localhost:8000/assets/bookcover/" + item.book_cover_photo + ".jpg"} className="card-img-top img-book-card" alt="Image Error" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.book_title}</h5>
                                                            <p className="card-text">{item.author_name}</p>
                                                        </div>
                                                        <div className='card-footer text-white'>
                                                            {item.discount_price != null ? (
                                                                <div>
                                                                    <div className='d-inline text-decoration-line-through fw-light' style={{ marginRight: "5px" }}>
                                                                        ${item.book_price}
                                                                    </div>
                                                                    <div className='d-inline fw-bold'>
                                                                        ${item.discount_price}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className='fw-bold'>
                                                                        ${item.book_price}
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className='row'>
                                    {/* {renderListItem(state.bookList)} */}
                                    {state.onsaleBookList?.slice(8).map((item, i) => {
                                        if (item.book_cover_photo == null) {
                                            item.book_cover_photo = "bookNull";
                                        }
                                        return (
                                            <div className="col-md-3" key={i}>
                                                <Link to={`books/${item.book_id}`} style={{ textDecoration: 'none' }}>
                                                    <div className='card border border-1 h-100'>
                                                        <img src={"http://localhost:8000/assets/bookcover/" + item.book_cover_photo + ".jpg"} className="card-img-top img-book-card" alt="Image Error" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.book_title}</h5>
                                                            <p className="card-text">{item.author_name}</p>
                                                        </div>
                                                        <div className='card-footer text-white'>
                                                            {item.discount_price != null ? (
                                                                <div>
                                                                    <div className='d-inline text-decoration-line-through fw-light' style={{ marginRight: "5px" }}>
                                                                        ${item.book_price}
                                                                    </div>
                                                                    <div className='d-inline fw-bold'>
                                                                        ${item.discount_price}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className='fw-bold'>
                                                                        ${item.book_price}
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon bg-dark text-dark h-25" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon bg-dark text-dark h-25" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                )}
            </section>
            <section className='mt-5'>
                <div className="text-center" >
                    <div className="mx-auto col-md-8">
                        <h3 className="mb-3">Featured Books</h3>
                    </div>
                </div>
                <div>
                    <ul className="nav nav-pills mb-3 d-flex justify-content-center" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                Recommended
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                Popular
                            </button>
                        </li>
                    </ul>
                    {isLoading ? (
                        <div className="text-center">
                            <div className="spinner-border text-info" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="tab-content border border-1" id="pills-tImage Errorontent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                <div className="row gy-4 mg-auto w-80 p-3">
                                    {state.recommendedBookList?.map((item) => {
                                        if (item.book_cover_photo == null) {
                                            item.book_cover_photo = "bookNull";
                                        }
                                        return (
                                            <div className="col-md-3" >
                                                <Link to={`books/${item.book_id}`} style={{ textDecoration: 'none' }}>
                                                    <div className='card border border-1 h-100'>
                                                        <img src={"http://localhost:8000/assets/bookcover/" + item.book_cover_photo + ".jpg"} className="card-img-top img-book-card" alt="Image Error" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.book_title}</h5>
                                                            <p className="card-text">{item.author_name}</p>
                                                        </div>
                                                        <div className='card-footer text-white'>
                                                            {item.discount_price != null ? (
                                                                <div>
                                                                    <div className='d-inline text-decoration-line-through fw-light' style={{ marginRight: "5px" }}>
                                                                        ${item.book_price}
                                                                    </div>
                                                                    <div className='d-inline fw-bold'>
                                                                        ${item.discount_price}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className='fw-bold'>
                                                                        ${item.book_price}
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <div className="row gy-4 mg-auto w-80 p-3">
                                    {state.popularBookList?.map((item) => {
                                        if (item.book_cover_photo == null) {
                                            item.book_cover_photo = "bookNull";
                                        }
                                        return (
                                            <div className="col-md-3" >
                                                <Link to={`books/${item.book_id}`} style={{ textDecoration: 'none' }}>
                                                    <div className='card border border-1 h-100'>
                                                        <img src={"http://localhost:8000/assets/bookcover/" + item.book_cover_photo + ".jpg"} className="card-img-top img-book-card" alt="Image Error" />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.book_title}</h5>
                                                            <p className="card-text">{item.author_name}</p>
                                                        </div>
                                                        <div className='card-footer text-white'>
                                                            {item.discount_price != null ? (
                                                                <div>
                                                                    <div className='d-inline text-decoration-line-through fw-light' style={{ marginRight: "5px" }}>
                                                                        ${item.book_price}
                                                                    </div>
                                                                    <div className='d-inline fw-bold'>
                                                                        ${item.discount_price}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className='fw-bold'>
                                                                        ${item.book_price}
                                                                    </div>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </section>
        </div>
    )
}
