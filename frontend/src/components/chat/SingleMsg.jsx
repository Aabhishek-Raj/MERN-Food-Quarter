import React from 'react'
import { useSelector } from 'react-redux'


const SingleMsg = ({ message }) => {

  const user = useSelector(state => state.auth.user)
  const supplier = useSelector(state => state.supplier.supplier)

  return (
    <>
      {user && (<div class={`${user.user._id === message.sender ? "self-end" : "self-start"} w-3/4 my-2`}>
        <div class={`${user.user._id === message.sender ? "bg-white" : 'bg-blue-300'} p-4 text-sm rounded-t-lg rounded-r-lg shadow`}>
          {message.content}
        </div>
      </div>)}

      {supplier && (<div class={`${supplier.supplier._id === message.sender ? "self-end" : "self-start"} w-3/4 my-2`}>
        <div class={`${supplier.supplier._id === message.sender ? "bg-white" : 'bg-blue-300'} p-4 text-sm rounded-t-lg rounded-r-lg shadow`}>
          {message.content}
        </div>
      </div>)}
    </>
  )
}

export default SingleMsg