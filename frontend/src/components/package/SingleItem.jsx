import React from 'react'

const SingleItem = ({item}) => {
  return (

    <div>
    <div className="border shadow-lg rounded-lg hover:scale-105 duration-300">
      <img className="w-full h-[200px] object-cover rounded-t-lg" src="https://images.unsplash.com/photo-1613769049987-b31b641f25b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80" alt="/" />
      <div className="flex justify-between px-2 py-4">
        <p className="font-bold">{item.itemname}</p>
        <p>
          <span className="p-1 rounded-full mr-5">{item.amount}</span>
          <span className="bg-orange-500 text-white p-1 rounded-full">$ {item.amount}</span>
        </p>
      </div>
    </div>
  </div>
  )
}

export default SingleItem