import React from 'react'
import { Link } from 'react-router-dom'

const OrderCard = ({order}) => {

    return (
        <div className="">
            <Link to={`/supplier/orderview/${order._id}`}>
            <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
                <h2 className="font-bold sm:text-xl">{order.user.username}</h2>
                <img className="w-20" src="https://toppng.com//public/uploads/preview/slice-sticker-just-stickers-pizza-slice-cartoon-11562909292fb4udrqmoe.png" alt="/" />
            </div>
            </Link>
        </div>
    )
}

export default OrderCard