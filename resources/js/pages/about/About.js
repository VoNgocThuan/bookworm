import React from 'react'
import "./about.css"

export default function About() {
  return (
    <div className="container">
      <h3 className="fs-4 fw-bold d-inline">About Us</h3>
      <hr className='mt-4 mb-5'></hr>
      <div className="row">
        <div className='col-md-2'></div>
        <div className="col-md-8">
          <h1 className="mb-3 text-center">Welcome to Bookworm</h1>
          <p className='text-welcome'>"Bookworm is an independent New Your bookstore and language school with locations in Manhattan and Brooklyn. We specialize in travel books and language classes."</p>
        </div>
        <div className='col-md-2'></div>
      </div>
      <div className="row">
        <div className='col-md-2'></div>
        <div className="col-md-4">
          <div>
            <h2>Our Story</h2>
            <p className='mt-4'>The name Bookworm was taken from the original name for New York International Airport, which was renamed JFK in December 1963.</p>
            <p>Our Manhattan stoore has just moved to the West Village. Our new location is 170 7th Avenue South, at the corner of Perry Street.</p>
            <p>From March 2008 through May 2016, the store was located in the Flatiron District.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <h2>Our Vision</h2>
            <p className='mt-4'>One of the last travel bookstores in the country, our Manhattan store carries a range of guidebooks (all 10% off) to suit the needs and tastes of every traveler and budget.</p>
            <p>We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook, and our well-read, well-traveled staff is happy to make reading recommendations for any traveler, book lover, or gift giver.</p>
          </div>
        </div>
        <div className='col-md-2'></div>
      </div>
    </div>
  )
}
