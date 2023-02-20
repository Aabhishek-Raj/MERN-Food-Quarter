import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToPackage } from '../../features/package/packageSlice'

const SingleItem = ({ item }) => {

  const dispatch = useDispatch()

  const handleAddToPackage = (supplierId, item) => {
    dispatch(addToPackage({ supplierId, item }))
  }

  return (
    <div >
      <div className=" bg-[#5f7c9c] border shadow-lg rounded-lg hover:scale-105 duration-300">
        <Link to={`/dash/single/${item._id}`}>
          <img className="w-full h-[200px] object-cover rounded-t-lg" src={`http://localhost:4000/images/${item.image}`} alt="/" />
        </Link>
        <div className="flex justify-between px-2 py-4">
          <p className="font-bold">{item.name}</p>
          <p>
            <span className="p-1 rounded-full mr-5">{item.calory}</span>
            <span className="bg-orange-500 px-2 border border-black text-white p-1 rounded-full">$ {item.price}</span>
            <button onClick={() => handleAddToPackage(item.supplierId, item)} className='border rounded-md px-5 py-1 border-black bg-white text-black mx-2'>add+</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingleItem