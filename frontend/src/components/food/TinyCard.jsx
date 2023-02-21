import React from 'react'

const TinyCard = ({item}) => {
    console.log(item)
  return (
        <div class="flex items-center justify-center h-full">
            <div class="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50">
                <div class="flex flex-col">
                    <div>
                        <h2 class="font-bold text-gray-600 text-center">{item.name}</h2>
                    </div>
                    <div class="my-6">
                        <div class="flex flex-row space-x-4 items-center">
                            <div id="icon">
                                <span>
                                    <img class="w-20 h-20 fill-stroke text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        src={`http://localhost:4000/images/${item.image}`}  alt=""/>
                                        {/* <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                                        </path> */}
                                    {/* </svg> */}
                                </span>
                            </div>
                            <div id="temp"> 
                                <h4 class="text-4xl">{item.itemquantity}</h4>
                                <p class="text-xs text-gray-500">{item.variety}</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full place-items-end text-right border-t-2 border-gray-100 mt-2">
                        <button class="text-indigo-600 text-xs font-medium">Details</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TinyCard