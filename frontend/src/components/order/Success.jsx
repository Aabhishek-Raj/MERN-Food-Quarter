import React from 'react'
import { Link } from 'react-router-dom'

const Success = () => {
    return (

        <div class="bg-gradient-to-br from-[#a6d1e6] to-[#daecf4]">
            <div class="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
                <div class="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                    <div class="border-t border-gray-200 text-center pt-8">
                        <h1 class="text-9xl font-bold text-green-600">Success</h1>
                        <h1 class="text-6xl font-medium py-8">Your Payment is Done</h1>
                        <p class="text-2xl pb-8 px-12 font-medium">The amount has been debited from your account and sended to the supplier you have ordered fom</p>
                        <Link to={'/dash'}>
                        <button class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6">
                            HOME
                        </button>
                        </Link>
                        <Link to={'/dash/history'}>
                        <button class="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500 text-white font-semibold px-6 py-3 rounded-md">
                            History
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Success