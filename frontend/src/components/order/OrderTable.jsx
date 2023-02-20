import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getOrderHistory } from '../../features/order/orderService'
import OrderColomn from './OrderColomn'

const OrderTable = () => {

    const [orders, setOrders] = useState()

    const fetchOrder = async () => {
        const results = await getOrderHistory()
        setOrders(results)
      }
    
      useEffect(() => {
        fetchOrder()
      }, [])




  return (
<div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Supplier</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Payment</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Products</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Quantity</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Total</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
      {
        orders &&  orders.map(order => (
          <OrderColomn key={order._id} order={order} />
        )) 
      }
    
    </tbody>
  </table>
</div>
  )
}

export default OrderTable