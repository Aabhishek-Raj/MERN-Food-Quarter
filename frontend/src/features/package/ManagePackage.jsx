import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { deleteFromPackage, manageItemQuantity } from './packageSlice'

const ManagePackage = () => {

  const { id } = useParams()

  const pack = useSelector(state => state.packages[id])


  const Smallcard = ({item}) => {

    const dispatch = useDispatch()

    const handleDelete = (supplierId, item) => {
      dispatch(deleteFromPackage({supplierId, item}))
    }

    const handleQuantityManage = (supplierId, item, manage) => {
      dispatch(manageItemQuantity({supplierId, item, manage}))
    }

    return (
      <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={`http://localhost:4000/images/${item.image}`} alt="" class="w-full rounded-lg sm:w-40" />
          <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div class="mt-5 sm:mt-0">
              <h2 class="text-lg font-bold text-gray-900">{item.name}</h2>
              <p class="mt-1 text-xs text-gray-700">{item.variety}</p>
            </div>
            <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div class="flex items-center border-gray-100">
                <button onClick={() => handleQuantityManage(item.supplierId, item, 'DECREASE')}>
                <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                </button>
                <input class="h-8 w-8 border bg-white text-center text-xs outline-none" defaultValue={3} value={item.itemquantity} min="1" />
                <button onClick={() => handleQuantityManage(item.supplierId, item, 'INCREASE')}>

                <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                </button>
              </div>
              <div class="flex items-center space-x-4">
                <p class="text-sm">{item.itemquantity * item.price}.000 $</p>
                <button onClick={() => handleDelete(item.supplierId, item)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
    )

  }  

  return (
  <div class="h-screen bg-gray-100 pt-20">
    <h1 class="mb-10 text-center text-2xl font-bold">Added Items</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">

      {
        pack.items.map(item => (
          <Smallcard key={item._id} item={item}/>
        ))
      }  

      </div>
      {/* <!-- Sub total --> */}
      <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div class="mb-2 flex justify-between">
          <p class="text-gray-700">Subtotal</p>
          <p class="text-gray-700">$129.99</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-700">Shipping</p>
          <p class="text-gray-700">$4.99</p>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <p class="text-lg font-bold">Total</p>
          <div class="">
            <p class="mb-1 text-lg font-bold">${pack.total} USD</p>
            <p class="text-sm text-gray-700">including VAT</p>
          </div>
        </div>
        <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Book now</button>
      </div>
    </div>
  </div>
  )
}

export default ManagePackage