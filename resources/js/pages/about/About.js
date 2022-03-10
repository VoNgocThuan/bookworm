import React from 'react'

export default function About() {
  return (
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
      <div className="tab-content border border-1" id="pills-tImage Errorontent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <div className="row gy-4 mg-auto w-80 p-3">
            <div className="col-md-3" >
              <div className='card border border-1 h-100'>
                <img src={"http://localhost:8000/assets/bookcover/" + 1 + ".jpg"} className="card-img-top img-book-card" alt="Image Error" />
                <div className="card-body">
                  <h5 className="card-title">aaaa</h5>
                  <p className="card-text">aaaaa</p>
                </div>
                <div className='card-footer text-white'>
                  <div>
                    <div className='d-inline text-decoration-line-through fw-light' style={{ marginRight: "5px" }}>
                      $1
                    </div>
                    <div className='d-inline fw-bold'>
                      $1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <div className="row gy-4 mg-auto w-80 p-3">
            <div className="col-md-3" >
              <div className='card border border-1 h-100'>
                <img src={"http://localhost:8000/assets/bookcover/" + 2 + ".jpg"} className="card-img-top img-book-card" alt="Image Error" />
                <div className="card-body">
                  <h5 className="card-title">abc</h5>
                  <p className="card-text">abc</p>
                </div>
                <div className='card-footer text-white'>
                  <div>
                    <div className='d-inline text-decoration-line-through fw-light' style={{ marginRight: "5px" }}>
                      $1
                    </div>
                    <div className='d-inline fw-bold'>
                      $1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
