import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import Singlepack from "../../components/package/Singlepack"
import { MdCreate } from "react-icons/md"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFoods } from "../food/foodSlice"


const SupplierHome = () => {

  const { foods } = useSelector((state) => state.food)

  const { packageId } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getFoods()) 

  }, [dispatch])  

  return (
    <div className=" overflow-hidden bg-gradient-to-br from-[#a6d1e6] to-[#daecf4]">




      {/* hero */}
      <div className="max-w-[1640px] mx-auto p-4 shadow-sm">
        <div className="max-h-[500px] relative">
          {/* overlay */}
          <div className="absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center">
            <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">The <span className="text-orange-500">Best</span></h1>
            <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"><span className="text-orange-500">Foods</span>Delivered</h1>
          </div>
          <img className="w-full max-h-[500px] object-cover" src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="/" />
        </div>
      </div>

      <div className="mx-10">

        {/* headlineCard  */}
        <p className="font-bold text-2xl px-2 pt-4 mt-10">My Packages</p>
        {foods.length > 0 ? (
          <div className="max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6">

            {foods.map(food => (
              <Singlepack key={food._id} food={food} />

            ))}

            <Link to={'/supplier/create'}>
              <div className='border-2 border-dotted border-gray-800  rounded-xl relative w-full h-full flex flex-col items-center justify-center gap-2'>
                <MdCreate className='text-gray-500 text-3xl hover:text-gray-700' />
                <p className='text-gray-500 hover:text-gray-700'>Create a new package</p>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <h3>You havn't created any packages</h3>
            <Link to={'/supplier/create'}>
              <div className='border-2 border-dotted border-gray-800  rounded-xl relative w-full h-full flex flex-col items-center justify-center gap-2'>
                <MdCreate className='text-gray-500 text-3xl hover:text-gray-700' />
                <p className='text-gray-500 hover:text-gray-700'>Create a new package</p>
              </div>
            </Link>

          </div>
        
        )
        }
      </div>


      {/* foodCard!! */}
      <div className="max-w-[1640px] m-auto px-4 py-12">
        <h1 className="text-orange-600 fony-bold text-center">Top Rated</h1>

        {/* filter Row */}
        <div className="flex flex-col lg:flex-row justify-between">
          {/* filter type */}
          <div className="font-bold text-gray-700">
            <p>Filter type</p>
            <div className="flex justify-between flex-wrap">
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">all</button>
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">Burgers</button>
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">Burgers</button>
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">Burgers</button>
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">Burgers</button>
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">Burgers</button>
            </div>

          </div>

          {/* Filter price */}
          <div>
            <p className="font-bold text-gray-700">Filter Price</p>
            <div className="flex justify-between max-w-[390px] w-full">
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">$</button>
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">$4</button>
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">$$$</button>
              <button className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">$$$$</button>
            </div>
          </div>
        </div>

        {/* Display food */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
            <img className="w-full h-[200px] object-cover rounded-t-lg" src="https://images.unsplash.com/photo-1613769049987-b31b641f25b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80" alt="/" />
            <div className="flex justify-between px-2 py-4">
              <p className="font-bold">item name</p>
              <p>
                <span className="bg-orange-500 text-white p-1 rounded-full">price$$</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* categories */}
      <div className="max-w-[1640px] m-auto px-4 py-12">
        <h1 className="text-orange-600 font-bold text-4xl text-center">Top Rated Menu Items</h1>
        {/* category */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
          <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
            <h2 className="font-bold sm:text-xl">itemName</h2>
            <img className="w-20" src="https://toppng.com//public/uploads/preview/slice-sticker-just-stickers-pizza-slice-cartoon-11562909292fb4udrqmoe.png" alt="/" />
          </div>
        </div>
      </div>


    </div>
  )
}

export default SupplierHome