import React from 'react'
import { Link } from 'react-router-dom'

const Singlepack = ({pack}) => {
  return (
    <div className="rounded-xl relative">
    {/* overlay */}
    <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
      <p className="font-bold text-2xl px-2 pt-4">{pack.packagename}</p>
      <p className="px-2">{pack.variety}</p>
      <Link to={`/supplier/package/${pack._id}`}>
      <button className="border rounded-xl px-5 py-1 border-white bg-white text-black mx-2 absolute bottom-4">Make Changes</button>
      </Link>
    </div>
    <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="/" />
  </div>
  )
}

export default Singlepack