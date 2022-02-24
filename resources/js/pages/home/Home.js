import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./home.css"

export default function Home() {
    const [state, setState] = useState({
        bookList: [],
    });
    useEffect(() => {
        getAllBook();
    }, [])
    const getAllBook = async () => {
        const res = await Axios.get('http://localhost:8000/api/books/bookOnSale');
        setState({
            bookList: res.data.data
        })
    }
    Axios.get('http://localhost:8000/api/books/bookRecommended').then((data) => {
        console.log(data);
    });
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
            <div className='row'>
                <h4 className='col-md-6'>On Sale</h4>
                <div className="dropdown col-md-6 p-bottom">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        View All
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
            </div>
            <div id="carouselExampleControls" className="carousel slide border border-1" data-bs-ride="carousel">
                <div className="carousel-inner mg-auto w-80 p-3">
                    <div className="carousel-item active">
                        <div className='row'>
                            {/* {renderListItem(state.bookList)} */}
                            {state.bookList.map((item) => {
                                if (item.book_cover_photo == null) {
                                    item.book_cover_photo = "bookNull";
                                }
                                return (
                                    <div className="col-md-3" >
                                        <Link to={`books/${item.book_id}`}>
                                            <div className='card border border-1'>
                                                <img src={"http://localhost:8000/bookcover/" + item.book_cover_photo + ".jpg"} className="card-img-top" alt="abc" />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.book_title}</h5>
                                                    <p className="card-text">{item.author_name}</p>
                                                    <a href="#" className="btn btn-primary">Go somewhere</a>
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
        </div>
    )
}
