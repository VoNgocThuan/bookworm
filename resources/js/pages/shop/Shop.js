import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

export default function Shop() {

  const [stateBook, setStateBook] = useState({
    book: [],
  });

  const [stateSort, setStateSort] = useState({
    sort: "onSale",
  });

  const [statePaginate, setStatePaginate] = useState({
    paginate: 5
  });

  const [stateFilterCate, setStateFilterCate] = useState({
    filterCate: null,
  });

  const [stateFilterAuthor, setStateFilterAuthor] = useState({
    filterAuthor: null,
  });

  const [stateFilterStar, setStateFilterStar] = useState({
    filterStar: null
  });

  const [statePage, setStatePage] = useState({
    from: 1,
    to: 1,
    activePage: 1,
    itemsCountPerPage: 0,
    totalItemsCount: 0,
  });

  const [stateAccordion, setStateAccordion] = useState({
    categoryName: [],
    authorName: []
  });

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

  const getAccordionData = async () => {
    const resCategoryName = await Axios.get('http://localhost:8000/api/categories/name-shoppage');
    const resAuthorName = await Axios.get('http://localhost:8000/api/authors/name-shoppage');

    setStateAccordion({
      categoryName: resCategoryName.data.data,
      authorName: resAuthorName.data.data
    })
  }

  useEffect(() => {
    getAccordionData();
  }, [])

  useEffect(() => {
    getBookData();
  }, [stateFilterCate.filterCate, stateFilterAuthor.filterAuthor, stateFilterStar.filterStar,
  stateSort.sort, statePaginate.paginate, statePage.activePage])

  const getBookData = async () => {
    if (stateFilterCate.filterCate != null
      && stateFilterAuthor.filterAuthor != null
      && stateFilterStar.filterStar != null) {
      const resBookCondition = await Axios.get(`http://localhost:8000/api/books/condition?filter[category_name]=${stateFilterCate.filterCate}&filter[author_name]=${stateFilterAuthor.filterAuthor}&filter[avg_star]=${stateFilterStar.filterStar}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
      setStateBook({
        book: resBookCondition.data.data
      })
      setStatePage({
        from: resBookCondition.data.from,
        to: resBookCondition.data.to,
        activePage: resBookCondition.data.current_page,
        itemsCountPerPage: resBookCondition.data.per_page,
        totalItemsCount: resBookCondition.data.total
      })
    }
    else if (stateFilterCate.filterCate != null
      && stateFilterAuthor.filterAuthor != null
      && stateFilterStar.filterStar == null) {
      const resBookCondition = await Axios.get(`http://localhost:8000/api/books/condition?filter[category_name]=${stateFilterCate.filterCate}&filter[author_name]=${stateFilterAuthor.filterAuthor}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
      setStateBook({
        book: resBookCondition.data.data
      })
      setStatePage({
        from: resBookCondition.data.from,
        to: resBookCondition.data.to,
        activePage: resBookCondition.data.current_page,
        itemsCountPerPage: resBookCondition.data.per_page,
        totalItemsCount: resBookCondition.data.total
      })
    }
    else if (stateFilterCate.filterCate != null
      && stateFilterAuthor.filterAuthor == null
      && stateFilterStar.filterStar != null) {
      const resBookCondition = await Axios.get(`http://localhost:8000/api/books/condition?filter[category_name]=${stateFilterCate.filterCate}&filter[avg_star]=${stateFilterStar.filterStar}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
      setStateBook({
        book: resBookCondition.data.data
      })
      setStatePage({
        from: resBookCondition.data.from,
        to: resBookCondition.data.to,
        activePage: resBookCondition.data.current_page,
        itemsCountPerPage: resBookCondition.data.per_page,
        totalItemsCount: resBookCondition.data.total
      })
    }
    else if (stateFilterCate.filterCate == null
      && stateFilterAuthor.filterAuthor != null
      && stateFilterStar.filterStar != null) {
      const resBookCondition = await Axios.get(`http://localhost:8000/api/books/condition?filter[author_name]=${stateFilterAuthor.filterAuthor}&filter[avg_star]=${stateFilterStar.filterStar}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
      setStateBook({
        book: resBookCondition.data.data
      })
      setStatePage({
        from: resBookCondition.data.from,
        to: resBookCondition.data.to,
        activePage: resBookCondition.data.current_page,
        itemsCountPerPage: resBookCondition.data.per_page,
        totalItemsCount: resBookCondition.data.total
      })
    }
    else if (stateFilterCate.filterCate != null
      && stateFilterAuthor.filterAuthor == null
      && stateFilterStar.filterStar == null) {
      const resBookCondition = await Axios.get(`http://localhost:8000/api/books/condition?filter[category_name]=${stateFilterCate.filterCate}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
      setStateBook({
        book: resBookCondition.data.data
      })
      setStatePage({
        from: resBookCondition.data.from,
        to: resBookCondition.data.to,
        activePage: resBookCondition.data.current_page,
        itemsCountPerPage: resBookCondition.data.per_page,
        totalItemsCount: resBookCondition.data.total
      })
    }
    else if (stateFilterCate.filterCate == null
      && stateFilterAuthor.filterAuthor != null
      && stateFilterStar.filterStar == null) {
      const resBookCondition = await Axios.get(`http://localhost:8000/api/books/condition?filter[author_name]=${stateFilterAuthor.filterAuthor}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
      setStateBook({
        book: resBookCondition.data.data
      })
      setStatePage({
        from: resBookCondition.data.from,
        to: resBookCondition.data.to,
        activePage: resBookCondition.data.current_page,
        itemsCountPerPage: resBookCondition.data.per_page,
        totalItemsCount: resBookCondition.data.total
      })
    }
    else if (stateFilterCate.filterCate == null
      && stateFilterAuthor.filterAuthor == null
      && stateFilterStar.filterStar != null) {
      const resBookCondition = await Axios.get(`http://localhost:8000/api/books/condition?filter[avg_star]=${stateFilterStar.filterStar}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
      setStateBook({
        book: resBookCondition.data.data
      })
      setStatePage({
        from: resBookCondition.data.from,
        to: resBookCondition.data.to,
        activePage: resBookCondition.data.current_page,
        itemsCountPerPage: resBookCondition.data.per_page,
        totalItemsCount: resBookCondition.data.total
      })
    }
    else if (stateFilterCate.filterCate == null
      && stateFilterAuthor.filterAuthor == null
      && stateFilterStar.filterStar == null) {
      const resBookCondition = await Axios.get(`http://localhost:8000/api/books/condition?sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
      setStateBook({
        book: resBookCondition.data.data
      })
      setStatePage({
        from: resBookCondition.data.from,
        to: resBookCondition.data.to,
        activePage: resBookCondition.data.current_page,
        itemsCountPerPage: resBookCondition.data.per_page,
        totalItemsCount: resBookCondition.data.total
      })
    }
  }

  return (
    <div className='container'>
      <h3 className="fs-4 fw-bold d-inline">Books </h3>
      {stateFilterCate.filterCate != null ||
        stateFilterAuthor.filterAuthor != null ||
        stateFilterStar.filterStar != null ? (
        <div className='d-inline fw-light'>
          (Filltered by Category: {stateFilterCate.filterCate}, Author: {stateFilterAuthor.filterAuthor}, Star: {stateFilterStar.filterStar})
        </div>
      ) : (
        <div></div>
      )}
      <hr className='mt-4 mb-5'></hr>
      <div className='row'>
        <div className='col-md-2'>
          <h6>Filter By</h6>
          <div className="accordion mt-4" id="accordionExample">
            <div className="accordion-item rounded-3 border border-1 border-dark">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Category
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <ul className="list-group">
                    {stateAccordion.categoryName.map((item, i) => (
                      <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterCate({ filterCate: item.category_name })}>
                        {item.category_name}
                      </li>
                    ))}
                    <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterCate({ filterCate: null })}>
                      All Category
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="accordion-item rounded-3 border border-1 border-dark mt-3">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Author
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  {stateAccordion.authorName.map((item, i) => (
                    <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterAuthor({ filterAuthor: item.author_name })}>
                      {item.author_name}
                    </li>
                  ))}
                  <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterAuthor({ filterAuthor: null })}>
                    All Author
                  </li>
                </div>
              </div>
            </div>
            <div className="accordion-item rounded-3 border border-1 border-dark mt-3">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Rating Review
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 1 })}>1 Star</li>
                    <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 2 })}>2 Star</li>
                    <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 3 })}>3 Star</li>
                    <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 4 })}>4 Star</li>
                    <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 5 })}>5 Star</li>
                    <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: null })}>All Star</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-10'>
          <div className="d-flex justify-content-between">
            <p style={{ marginRight: "20px" }}>Showing {statePage.from}-{statePage.to} of {statePage.totalItemsCount} books</p>
            <div className='d-flex'>
              <select value={stateSort.sort} onChange={handleChangeSort} style={{ marginRight: "10px" }} className="dropdown btn bg-quantity text-white">
                <option value="onSale" className='bg-quantity text-white'>Sort by on sale</option>
                <option value="popularity" className='bg-quantity text-white'>Sort by popularity</option>
                <option value="priceAsc" className='bg-quantity text-white'>Sort by price: low to high</option>
                <option value="priceDesc" className='bg-quantity text-white'>Sort by price: high to low</option>
              </select>
              <select value={statePaginate.paginate} onChange={handleChangePaginate} style={{ marginRight: "10px" }} className="dropdown btn bg-quantity text-white">
                <option value="5" className='bg-quantity text-white'>Show 5</option>
                <option value="15" className='bg-quantity text-white'>Show 15</option>
                <option value="20" className='bg-quantity text-white'>Show 20</option>
                <option value="25" className='bg-quantity text-white'>Show 25</option>
              </select>
            </div>
          </div>
          <div className='row mt-3 gy-4'>
            {stateBook.book.map((item, i) => {
              if (item.book_cover_photo == null) {
                item.book_cover_photo = "bookNull";
              }
              return (
                <div className="col-md-3" key={i}>
                  <Link to={`/books/${item.book_id}`} style={{ textDecoration: 'none' }}>
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
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              activePage={statePage.activePage}
              itemsCountPerPage={statePage.itemsCountPerPage}
              totalItemsCount={statePage.totalItemsCount}
              pageRangeDisplayed={3}
              //firstPageText="First"
              prevPageText="Previous"
              nextPageText="Next"
              //lastPageText="Last"
              onChange={handlePageChange}
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
