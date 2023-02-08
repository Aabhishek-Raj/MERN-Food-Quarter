import React from 'react'
import { Link } from 'react-router-dom'

const Singlepack = ({food}) => {
  return (
      // console.log(food)
    <div className="rounded-xl relative">
    {/* overlay */}
    <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
      <p className="font-bold text-2xl px-2 pt-4">{food.name}</p>
      <p className="px-2">{food.variety}</p>
      <Link to={`/supplier/package/${food._id}`}>
      <button className="border rounded-xl px-5 py-1 border-white bg-white text-black mx-2 absolute bottom-4">Make Changes</button>
      </Link>
    </div>
    <img className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl" src={`http://localhost:4000/images/${food.image}`} alt="/" />
  </div>
  )
}

export default Singlepack