import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDeliveryAddress, getOrder } from '../../features/order/orderService'
import TinyCard from '../food/TinyCard'

const OrderHistory = () => {

    const [data, setData] = useState()
    const [delivery, setDelivery] = useState()
    const isMounted = useRef(false);

    const { id } = useParams()

    const fetchData = async () => {
        const data = await getOrder(id)
        setData(data)
        const result = await getDeliveryAddress(data?.deliveryaddress, data?.user._id)
        setDelivery(result)
    }

    useEffect(() => {
        if (!isMounted.current) {
            fetchData(id);
            isMounted.current = true;
        }
    }, [])


    return (

        <div class=" border border-black relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
            <div class="px-6">
                <div class="flex flex-wrap justify-center">
                    <div class="w-full flex justify-center">
                    </div>
                    <div class="w-full text-center mt-5">
                        <div class="flex justify-center lg:pt-4 pt-8 pb-0">
                            <div class="p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">3360</span>
                                <span class="text-sm text-slate-400">People</span>
                            </div>
                            <div class="p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{data?.quantity}</span>
                                <span class="text-sm text-slate-400">Quatity</span>
                            </div>

                            <div class="p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">{data?.total}</span>
                                <span class="text-sm text-slate-400">Amount</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-2">
                    <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">{data?.user.username}</h3>
                    <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                        <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{data?.user.email}
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2 py-6'>
                        {
                            data?.items.map(each => (

                                <TinyCard key={each._id} item={each}/>
                            ))
                        }


                    </div>
                </div>
                <div class="mt-6 py-6 border-t border-slate-200 text-center">
                    <div class="flex flex-wrap justify-center">
                        <div class="w-full px-4">
                            <p>Delivery Address:</p>
                            {
                                delivery && (
                                    <>
                                        <p class="font-light leading-relaxed text-slate-600 mb-4">{delivery[0].name}  {delivery[0].pincode} {delivery[0].aaddress} {delivery[0].district} {delivery[0].locality} {delivery[0].landmark} {delivery[0].state}</p>
                                        <p class="font-light leading-relaxed text-slate-600 mb-4">Phone: {delivery[0].phoneNo} {delivery[0].alternatephone} {delivery[0].addressType}</p>

                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderHistory