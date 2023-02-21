import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { userSearch } from '../../features/chat/chatService'
import { foodSearch } from '../../features/food/foodService'

const Search = ({item, setSearchResult, setFoodSearchResult}) => {

    const [search, setSearch] = useState()
   

    const handleSearch = async () => {
        if(!search) {
            return toast.error("Give a supplier name to search", {position: 'top-right'})
        }

        const result = await userSearch(search) 
        
        setSearchResult(result)

    }

    const handleFoodSearch = async () => {
        if(!search) {
            return toast.error('Type a Food you want to search', {position: 'top-right'})
        }

        const result = await foodSearch(search)

        setFoodSearchResult(result)
    }

  return (
    <div class="flex justify-between px-3 pt-1 text-white">
    <div class="flex items-center w-full py-2">
        <div class="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                <button onClick={item ? handleFoodSearch: handleSearch} type="submit" class="p-1 focus:outline-none focus:shadow-none">
                    <svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill-rule="nonzero" d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z" />
                    </svg>
                </button>
            </span>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" name="q"
                class="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                placeholder="Search..." autocomplete="off" />
        </div>
    </div>
</div>
  )
}

export default Search