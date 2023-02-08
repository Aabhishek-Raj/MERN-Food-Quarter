import React from 'react'

const SingleItem = ({item}) => {
  return (

    <div>
    <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
      <img className="w-full h-[200px] object-cover rounded-t-lg" src={`http://localhost:4000/images/${item.image}`} alt="/" />
      <div className="flex justify-between px-2 py-4">
        <p className="font-bold">{item.name}</p>
        <p>
          <span className="p-1 rounded-full mr-5">{item.calory}</span>
          <span className="bg-orange-500 text-white p-1 rounded-full">$ {item.price}</span>
        </p>
      </div>
    </div>
  </div>
  )
}

export default SingleItem