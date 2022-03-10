import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination";
import "./bookdetail.css";
import { useDispatch } from 'react-redux'
import { setTotalCartQty } from '../../actions/index'

export default function BookDetail() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        book: {},
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(true);

    const [stateErrorReview, setStateErrorReview] = useState({
        errorReview: undefined
    })

    const [stateReview, setStateReview] = useState({
        reviewListing: [],
        reviewCondition: [],
        reviewTotal: 0,
        reviewAvg: 0
    });

    const [stateSort, setStateSort] = useState({
        sort: "newestToOldest",
    });

    const [statePaginate, setStatePaginate] = useState({
        paginate: 5
    });

    const [stateFilter, setStateFilter] = useState({
        filter: null
    });

    const [stateQty, setStateQty] = useState({
        quantity: 1
    });

    const [statePage, setStatePage] = useState({
        from: 1,
        to: 1,
        activePage: 1,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
    });

    const [stateCart, setStateCart] = useState({
        cart: {},
    });

    const [stateStatus, setStateStatus] = useState({
        status: undefined
    });

    const [stateCartQty, setStateCartQty] = useState({
        total: 0
    });

    const [stateReviewTitle, setStateReviewTitle] = useState('');

    const [stateReviewDetail, setStateReviewDetail] = useState('');

    const [stateReviewStar, setStateReviewStar] = useState({
        reviewStar: 1
    });

    console.log(stateReviewTitle)
    console.log(stateReviewDetail)

    const handleChangeSort = (e) => {
        setStateSort(prevStateSort => ({
            ...prevStateSort, sort: e.target.value
        }));
    };

    const handleChangePaginate = (e) => {
        setStatePaginate(prevStatePaginate => ({
            ...prevStatePaginate, paginate: e.target.value
        }));

        handlePageChange(1)
    }

    function handlePageChange(pageNumber) {
        setStatePage({ activePage: pageNumber });
    }

    const handleChangeReviewStar = (e) => {
        setStateReviewStar(prevStateStar => ({
            ...prevStateStar, reviewStar: e.target.value
        }));
    };

    function handleAddToCart() {
        try {
            if (stateCart.cart == null) {
                Object.keys(state.book).map((item) => (
                    Axios.post('http://localhost:8000/api/cart', {
                        id: id,
                        quantity: stateQty.quantity,
                        book_title: state.book[item].book_title,
                        book_price: state.book[item].book_price,
                        book_cover_photo: state.book[item].book_cover_photo,
                        discount_price: state.book[item].discount_price,
                        author_name: state.book[item].author_name
                    }).then(
                        getCartTotalQuantity(),
                    )
                ))
            }
            else {
                handleUpdateCartQty();
            }
            setIsError(false);
            setTimeout(() => {
                setIsError(true);
            }, 3000)
        } catch (error) {
            setIsError(true);
        }
    }

    async function handleSubmitReview() {
        try {
            const res = await Axios.post('http://localhost:8000/api/reviews', {
                book_id: id,
                review_title: stateReviewTitle,
                review_details: stateReviewDetail,
                rating_start: stateReviewStar.reviewStar
            })
            if (res.data.success) {
                getReviewData();
                setStateErrorReview({
                    errorReview: false
                })
                setTimeout(() => {
                    setStateErrorReview({
                        errorReview: true
                    });
                }, 5000)
            }
            else {
                setStateErrorReview({ errorReview: res.data.errors });
            }
            console.log(res.data.success);
        } catch (error) {
            setIsError(true);
        }
    }

    function handleUpdateCartQty() {
        if (stateCart.cart.quantity + stateQty.quantity < 9) {
            Axios.put('http://localhost:8000/api/cart/update-cart', {
                id: id,
                quantity: stateCart.cart.quantity + stateQty.quantity
            }).then(
                getCartTotalQuantity()
            )
        }
    }

    useEffect(() => {
        getBookData();
        getCartDetail();
        //getCartTotalQuantity();
    }, [])

    useEffect(() => {
        getReviewData();
    }, [stateSort.sort, statePaginate.paginate, stateFilter.filter, statePage.activePage])

    const getBookData = async () => {
        setIsLoading(true);
        const res = await Axios.get(`http://localhost:8000/api/books/${id}`);
        setState({
            book: res.data.data
        })
    }

    const getCartDetail = async () => {
        const resCartList = await Axios.get(`http://localhost:8000/api/cart/${id}`);
        if (resCartList.data == "") {
            setStateCart({ cart: null })
        } else {
            setStateCart({
                cart: resCartList.data
            })
        }
    }

    const getReviewData = async () => {
        setIsLoading(true);
        const resReviewListing = await Axios.get(`http://localhost:8000/api/reviews/listing/${id}`);
        const resReviewTotal = await Axios.get(`http://localhost:8000/api/reviews/total/${id}`);
        const resReviewAvg = await Axios.get(`http://localhost:8000/api/reviews/avg/${id}`);
        const reviewAvgStar = Math.round(resReviewAvg.data * 10) / 10;

        if (stateFilter.filter != null) {
            const resReviewCondition = await Axios.get(`http://localhost:8000/api/reviews/condition/${id}?filter[rating_star]=${stateFilter.filter}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
            const newArray = resReviewListing.data.slice();
            setStateReview({
                reviewTotal: resReviewTotal.data,
                reviewAvg: reviewAvgStar,
                reviewListing: resReviewListing.data,
                reviewCondition: resReviewCondition.data.data
            })
            setStatePage({
                from: resReviewCondition.data.from,
                to: resReviewCondition.data.to,
                activePage: resReviewCondition.data.current_page,
                itemsCountPerPage: resReviewCondition.data.per_page,
                totalItemsCount: resReviewCondition.data.total
            })
            for (var i = 1; i <= 5; i++) {
                if (starExists(resReviewListing.data, i) == false) {
                    const newObj = { 'star': i, 'count': 0 }
                    newArray.push(newObj);
                }
            }
            newArray.sort((a, b) => (a.star < b.star) ? 1 : -1)
            setStateReview({
                reviewTotal: resReviewTotal.data,
                reviewAvg: reviewAvgStar,
                reviewListing: newArray,
                reviewCondition: resReviewCondition.data.data
            })
        }
        else {
            const resReviewCondition = await Axios.get(`http://localhost:8000/api/reviews/condition/${id}?sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
            const newArray = resReviewListing.data.slice();
            setStateReview({
                reviewTotal: resReviewTotal.data,
                reviewAvg: reviewAvgStar,
                reviewListing: resReviewListing.data,
                reviewCondition: resReviewCondition.data.data
            })
            setStatePage({
                from: resReviewCondition.data.from,
                to: resReviewCondition.data.to,
                activePage: resReviewCondition.data.current_page,
                itemsCountPerPage: resReviewCondition.data.per_page,
                totalItemsCount: resReviewCondition.data.total
            })
            for (var i = 1; i <= 5; i++) {
                if (starExists(resReviewListing.data, i) == false) {
                    const newObj = { 'star': i, 'count': 0 }
                    newArray.push(newObj);
                }
            }
            newArray.sort((a, b) => (a.star < b.star) ? 1 : -1)
            setStateReview({
                reviewTotal: resReviewTotal.data,
                reviewAvg: reviewAvgStar,
                reviewListing: newArray,
                reviewCondition: resReviewCondition.data.data
            })
        }
        setIsLoading(false);
    }

    const getCartTotalQuantity = async () => {
        const res = await Axios.get('http://localhost:8000/api/cart/total-qty');
        dispatch(setTotalCartQty(res.data))
        setStateCartQty({ total: res.data })
    }

    function starExists(arr, star) {
        return arr.some(function (el) {
            return el.star == star;
        });
    }

    return (
        <div className='container'>
            {Object.keys(state.book).map(
                (item, i) => (
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='row border-book-detail rounded-3 border-1'>
                                <div className='col-md-4 p-0'>
                                    {state.book[item].book_cover_photo != null ? (
                                        <img src={"http://localhost:8000/bookcover/" + state.book[item].book_cover_photo + ".jpg"} className="card-img-top" alt="abc" />
                                    ) : (
                                        <img src={"http://localhost:8000/bookcover/bookNull.jpg"} className="card-img-top" alt="abc" />
                                    )}
                                    <p className='fl-right d-inline'>By <h6 className='d-inline'>{state.book[item].author_name}</h6></p>
                                </div>
                                <div className='col-md-8'>
                                    <div className='mt-3'>
                                        <h4>{state.book[item].book_title}</h4>
                                        <p>{state.book[item].book_summary}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='border-book-detail rounded-3 border-1'>
                                <div className='bg-quantity px-5 text-white border-book-detail rounded-3 border-1'>
                                    {state.book[item].discount_price != null ? (
                                        <div>
                                            <div className='d-inline text-decoration-line-through fw-light fs-5' style={{ marginRight: "10px" }}>
                                                ${state.book[item].book_price}
                                            </div>
                                            <div className='d-inline fw-bold fs-4'>
                                                ${state.book[item].discount_price}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='d-inline fw-bold fs-4'>
                                            ${state.book[item].book_price}
                                        </div>
                                    )}

                                </div>
                                <div className='mt-5 px-5'>
                                    <h5>Quantity</h5>
                                    <div className="bm-flex bg-quantity text-white height-quantity rounded-3 border-1">
                                        <button
                                            type='button'
                                            className='btn btn-info text-white'
                                            onClick={() => {
                                                if (stateQty.quantity > 1) {
                                                    setStateQty({
                                                        quantity: stateQty.quantity - 1
                                                    })
                                                }
                                            }}
                                        >
                                            -
                                        </button>
                                        <div>{stateQty.quantity}</div>
                                        <button
                                            type='button'
                                            className='btn btn-info text-white'
                                            onClick={() => {
                                                if (stateQty.quantity < 8) {
                                                    setStateQty({
                                                        quantity: stateQty.quantity + 1
                                                    })
                                                }
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn text-white bg-quantity mt-4 w-100 mb-5"
                                        onClick={
                                            handleAddToCart
                                        }
                                    >
                                        Add to cart
                                    </button>
                                    {isError == false && (
                                        <div className="alert alert-success text-center" role="alert">
                                            Add to cart successfully!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}

            <div className="row mt-5">
                <div className="col-md-8 border-book-detail rounded-3 border-1">
                    <div className="py-4 px-3">
                        <h3 className="fs-4 fw-bold d-inline">Customer Reviews </h3>
                        {stateFilter.filter != null ? (
                            <div className='d-inline fw-light'>(Filltered by {stateFilter.filter} stars)</div>
                        ) : (
                            <div></div>
                        )}

                        <div className="d-flex">
                            <div>
                                <span className="fs-3 fw-bold">{stateReview.reviewAvg}</span>
                                <div
                                    className='star-mr text-decoration-underline fw-bold'
                                    onClick={() => setStateFilter({ filter: null })}
                                    role='button'
                                >
                                    ({stateReview.reviewTotal})
                                </div>
                            </div>
                            <div>
                                <span className="fs-3 fw-bold">Star</span>
                                <div>
                                    {Object.keys(stateReview.reviewListing).map(
                                        (item, i) => (
                                            <span className='px-1 text-decoration-underline' role='button' onClick={() => setStateFilter({ filter: stateReview.reviewListing[item].star })}>
                                                {stateReview.reviewListing[item].star} star({stateReview.reviewListing[item].count})
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <p className="mt-3" style={{ marginRight: "20px" }}>Showing {statePage.from}-{statePage.to} of {stateReview.reviewTotal} reviews</p>
                            <div className='d-flex mt-3'>
                                <select value={stateSort.sort} onChange={handleChangeSort} style={{ marginRight: "10px" }} className="dropdown btn bg-quantity text-white">
                                    <option value="newestToOldest" className='bg-quantity text-white'>Sort by date: newest to oldest</option>
                                    <option value="oldestToNewest" className='bg-quantity text-white'>Sort by date: oldest to newest</option>
                                </select>
                                <select value={statePaginate.paginate} onChange={handleChangePaginate} style={{ marginRight: "10px" }} className="dropdown btn bg-quantity text-white">
                                    <option value="5" className='bg-quantity text-white'>Show 5</option>
                                    <option value="15" className='bg-quantity text-white'>Show 15</option>
                                    <option value="20" className='bg-quantity text-white'>Show 20</option>
                                    <option value="25" className='bg-quantity text-white'>Show 25</option>
                                </select>
                            </div>
                        </div>
                        {Object.keys(stateReview.reviewCondition).map((item, i) => (
                            <div className="col-md-12 mt-5">
                                <h4 className='fw-bold fs-5 d-inline'>{stateReview.reviewCondition[item].review_title}</h4> |
                                <span className='d-inline'> {stateReview.reviewCondition[item].rating_start} stars</span>
                                <p>{stateReview.reviewCondition[item].review_details}</p>
                                <p>{stateReview.reviewCondition[item].review_date}</p>
                                <hr className='mt-5'></hr>
                            </div>
                        ))}
                        <div className="d-flex justify-content-center">
                            <Pagination
                                activePage={statePage.activePage}
                                itemsCountPerPage={statePage.itemsCountPerPage}
                                totalItemsCount={statePage.totalItemsCount}
                                pageRangeDisplayed={3}
                                prevPageText="Previous"
                                nextPageText="Next"
                                onChange={handlePageChange}
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="border-book-detail rounded-3 border-1 p-2">
                        <h3 className="fs-4 fw-bold">Write a review</h3>
                        <hr />
                        <form>
                            <div className="form-group">
                                <label for="exampleFormControlInput1" className='font-size-review'>
                                    Add a title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleFormControlInput1"
                                    placeholder="title"
                                    onChange={e => setStateReviewTitle(e.target.value)}
                                />
                            </div>
                            {stateErrorReview.errorReview && stateErrorReview.errorReview.review_title && (
                                <p className="text-danger">{stateErrorReview.errorReview.review_title[0]}</p>
                            )}
                            <div className="form-group mt-4">
                                <label for="exampleFormControlTextarea1" className='font-size-review'>
                                    Details please! Your review helps other shoppers.
                                </label>
                                <textarea
                                    className="form-control"
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    onChange={e => setStateReviewDetail(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="form-group mt-4">
                                <label for="exampleFormControlSelect1" className='font-size-review'>
                                    Select a rating star
                                </label>
                                <select
                                    className="form-control"
                                    id="exampleFormControlSelect1"
                                    onChange={handleChangeReviewStar}
                                >
                                    <option value={1}>1 star</option>
                                    <option value={2}>2 star</option>
                                    <option value={3}>3 star</option>
                                    <option value={4}>4 star</option>
                                    <option value={5}>5 star</option>
                                </select>
                            </div>
                            <hr className='mt-4' />
                            <button
                                type="button"
                                className="btn text-white bg-quantity w-100"
                                onClick={
                                    handleSubmitReview
                                }
                            >
                                Submit Review
                            </button>
                            {stateErrorReview.errorReview == false && (
                                <div className="alert alert-success text-center" role="alert">
                                    Submit Review successfully!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
