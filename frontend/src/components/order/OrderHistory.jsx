import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDeliveryAddress, getOrder } from '../../features/order/orderService'

const OrderHistory = () => {

    const [data, setData] = useState()
    const [delivery, setDelivery] = useState()
    const isMounted = useRef(false);

    const { id } = useParams()

    const fetchData = async () => {
        const data = await getOrder(id)
        setData(data)
        const result = await getDeliveryAddress(data?.deliveryaddress, data?.user._id)
        console.log(data)
        setDelivery(result)
    }

    useEffect(() => {
        if (!isMounted.current) {
            fetchData(id);
            isMounted.current = true;
        }
    }, [])


    return (

        <div class="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
            <div class="px-6">
                <div class="flex flex-wrap justify-center">
                    <div class="w-full flex justify-center">
                    </div>
                    <div class="w-full text-center mt-5">
                        <div class="flex justify-center lg:pt-4 pt-8 pb-0">
                            <div class="p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">3,360</span>
                                <span class="text-sm text-slate-400">Quatity</span>
                            </div>
                            <div class="p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">2,454</span>
                                <span class="text-sm text-slate-400">Quatity</span>
                            </div>

                            <div class="p-3 text-center">
                                <span class="text-xl font-bold block uppercase tracking-wide text-slate-700">564</span>
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
                </div>
                <div class="mt-6 py-6 border-t border-slate-200 text-center">
                    <div class="flex flex-wrap justify-center">
                        <div class="w-full px-4">
                            <p>Delivery Address:</p>
                            <p class="font-light leading-relaxed text-slate-600 mb-4">{data?.deliveryaddress}</p>
                            <button class="font-normal text-slate-700 hover:text-slate-400">Follow Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        // <footer class="relative pt-6 pb-2 mt-6">
        //     <div class="container mx-auto px-4">
        //         <div class="flex flex-wrap items-center md:justify-between justify-center">
        //             <div class="w-full md:w-6/12 px-4 mx-auto text-center">
        //             <div class="text-sm text-slate-500 font-semibold py-1">
        //                 Tailwind CSS Component from <a href="https://www.creative-tim.com/product/notus-design-system-pro?ref=tailwindcomponents" class="text-slate-700 hover:text-slate-500" target="_blank">Notus PRO Html</a> by <a href="https://www.creative-tim.com" class="text-slate-700 hover:text-slate-500" target="_blank"> Creative Tim</a>.
        //             </div>
        //             </div>
        //         </div>
        //     </div>
        // </footer>
    )
}

export default OrderHistory