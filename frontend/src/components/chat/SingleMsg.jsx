import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { invoiceChange } from '../../features/package/packageSlice'


const SingleMsg = ({ message, setPackData }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const supplierId = message.content.startsWith('{"ifPerson":') ? JSON.parse(message?.content)?.supplierId : null

  const pack = useSelector(state => state.packages[supplierId])

  if (pack) {
    setPackData(pack)
  }



  const user = useSelector(state => state.auth.user)

  const supplier = useSelector(state => state.supplier.supplier)


  const handleInvoicePay = () => {

    dispatch(invoiceChange(JSON.parse(message?.content)))
    navigate(`/dash/invoicepay/${JSON.parse(message?.content).supplierId}`)

  }  

  return (
    <>

      {
        message.content.startsWith('uploads') ? (
          <>
            {user && (<div class={`${user.user._id === message.sender ? "self-end" : "self-start"} w-3/4 my-2`}>
              <div class={`${user.user._id === message.sender ? "bg-white" : 'bg-blue-300'} p-4 text-sm rounded-t-lg rounded-r-lg shadow`}>
                {
                  message.content.substring(message.content.length - 3, message.content.length) === 'mp4' ?
                    <video src={`http://localhost:4000/file/${message.content}`} alt="/video" type="video/mp4" controls />
                    :
                    <img src={`http://localhost:4000/file/${message?.content}`} alt='img' />

                }
              </div>
            </div>)}

            {supplier && (<div class={`${supplier.supplier._id === message.sender ? "self-end" : "self-start"} w-3/4 my-2`}>
              <div class={`${supplier.supplier._id === message.sender ? "bg-white" : 'bg-blue-300'} p-4 text-sm rounded-t-lg rounded-r-lg shadow`}>
                {
                  message.content.substring(message.content.length - 3, message.content.length) === 'mp4' ?
                    <video src={`http://localhost:4000/file/${message.content}`} alt="/video" type="video/mp4" controls />
                    :
                    <img src={`http://localhost:4000/file/${message?.content}`} alt='img' />

                }
              </div>
            </div>)}

          </>
        ) :
          message.content.startsWith('{"ifPerson":') ? (
            <>
              {user && (<div class={`${user.user._id === message.sender ? "self-end" : "self-start"} w-3/4 my-2`}>
                <div class={`${user.user._id === message.sender ? "bg-white" : 'bg-blue-300'} p-4 text-sm rounded-t-lg rounded-r-lg shadow`}>
                  <div class="p-4">
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">Invoice • {JSON.parse(message.content)?.supplierName}</p>
                    <p class="text-gray-700">IF prchased for {JSON.parse(message.content)?.ifPerson} people</p>
                    <p class="text-3xl text-gray-900">$ {JSON.parse(message.content)?.discount}</p>
                    <p class="text-gray-700">is discount for evey {JSON.parse(message.content)?.perPerson} person</p>
                  </div>
                  {
                    user && (
                      <div class="flex p-4 border-t border-gray-300 text-gray-700">
                        <div class="flex-1 inline-flex items-center">
 
                          <button onClick={handleInvoicePay} class="text-gray-900 font-bold"> Pay now</button>

                        </div>
                      </div>
                    )
                  }
                </div>

              </div>)}

              {supplier && (<div class={`${supplier.supplier._id === message.sender ? "self-end" : "self-start"} w-3/4 my-2`}>
                <div class={`${supplier.supplier._id === message.sender ? "bg-white" : 'bg-blue-300'} p-4 text-sm rounded-t-lg rounded-r-lg shadow`}>

                  <div class="p-4">
                    <p class="uppercase tracking-wide text-sm font-bold text-gray-700">Invoice • {supplier.name}</p>
                    <p class="text-gray-700">IF prchased for {JSON.parse(message.content)?.ifPerson} people</p>
                    <p class="text-3xl text-gray-900">$ {JSON.parse(message.content)?.discount}</p>
                    <p class="text-gray-700">is discount for evey {JSON.parse(message.content)?.perPerson} person</p>
                  </div>
                  {
                    user && (
                      <div class="flex p-4 border-t border-gray-300 text-gray-700">
                        <div class="flex-1 inline-flex items-center">
                          <button class="text-gray-900 font-bold"> Book now</button>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>)}
            </>

          ) : (

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