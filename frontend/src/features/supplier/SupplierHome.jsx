import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { MdCreate } from "react-icons/md"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFoods } from "../food/foodSlice"
import Singlepack from "../../components/food/Singlepack"
import OrderCard from "../../components/order/OrderCard"
import { getAllOrders } from "../order/orderService"


const SupplierHome = () => {

  const { foods } = useSelector((state) => state.food)

  const [editOption, setEditOption] = useState(false)
  const [orders, setOrders] = useState()

  const { packageId } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getFoods())

  }, [dispatch])

  const fetchOrder = async () => {
    const results = await getAllOrders()
    setOrders(results)
  }

  useEffect(() => {
    fetchOrder()
  }, [])


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
        <div className="flex">
          <p className=" font-bold text-2xl px-2 pt-4 mt-10">My Foods</p>
          {
            editOption ? (
              <button onClick={() => setEditOption(false)} className="border rounded-2xl border-zinc-900 px-4 mt-14 ml-6 hover:border-white">Done </button>

            ) : (
              <button onClick={() => setEditOption(true)} className="border rounded-2xl border-zinc-900 px-4 mt-14 ml-6 hover:border-white">Edit </button>

            )
          }
        </div>
        {foods.length > 0 ? (
          <div className="max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6">

            {foods.map(food => (
              <Singlepack key={food._id} food={food} editOption={editOption} />

            ))}

            <Link to={'/supplier/create'}>
              <div className='border-2 border-dotted border-gray-800  rounded-xl relative w-full h-full flex flex-col items-center justify-center gap-2'>
                <MdCreate className='text-gray-500 text-3xl hover:text-gray-700' />
                <p className='text-gray-500 hover:text-gray-700'>Add a new Food Item</p>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <h3>You havn't created any Food items</h3>
            <Link to={'/supplier/create'}>
              <div className='border-2 border-dotted border-gray-800  rounded-xl relative w-full h-full flex flex-col items-center justify-center gap-2'>
                <MdCreate className='text-gray-500 text-3xl hover:text-gray-700' />
                <p className='text-gray-500 hover:text-gray-700'>Create a new Food item</p>
              </div>
            </Link>

          </div>

        )
        }
      </div>

      {/* categories */}
      <div className="max-w-[1640px] m-auto px-4 py-12">
        <h1 className="text-orange-600 font-bold text-4xl text-center">Orders:</h1>
        {/* category */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
          {
            orders && orders.map((order) => (

              <OrderCard key={order._id} order={order} />
            ))
          }
        </div>
      </div>


    </div >
  )
}

export default SupplierHome