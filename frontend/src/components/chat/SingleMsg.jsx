import React from 'react'
import { useSelector } from 'react-redux'


const SingleMsg = ({ message }) => {

  const user = useSelector(state => state.auth.user)
  const supplier = useSelector(state => state.supplier.supplier)

  console.log(message.content)

  return (
    <>
    {
      message.content.startsWith('uploads') ? (
        <>
         {user && (<div class={`${user.user._id === message.sender ? "self-end" : "self-start"} w-3/4 my-2`}>
        <div class={`${user.user._id === message.sender ? "bg-white" : 'bg-blue-300'} p-4 text-sm rounded-t-lg rounded-r-lg shadow`}>
        <video />
        <img className='max-w-2xl' src={`http://localhost:4000/file/${message?.content}`} alt='/'/>
        </div>
      </div>)}

      {supplier && (<div class={`${supplier.supplier._id === message.sender ? "self-end" : "self-start"} w-3/4 my-2`}>
        <div class={`${supplier.supplier._id === message.sender ? "bg-white" : 'bg-blue-300'} p-4 text-sm rounded-t-lg rounded-r-lg shadow`}>
        <video />
        <img className='max-w-2xl' src={`http://localhost:4000/file/${message?.content}`} alt='/'/>
        </div>
      </div>)}
        
        </>
      ): (
        
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
    </>
  )
}

export default SingleMsg