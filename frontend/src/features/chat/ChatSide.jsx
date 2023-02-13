import { AccessAlarm } from '@mui/icons-material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ChatCard from '../../components/chat/ChatCard'
import SearchChatCard from '../../components/chat/SearchChatCard'
import { userSearch } from './chatService'
import { accessChat } from './chatSlice'

const ChatSide = () => {

    const { chats } = useSelector(state => state.chat)

    const [ search , setSearch ] = useState()
    const [searchResult, setSearchResult ] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const dispatch = useDispatch()

    const handleSearch = async () => {
        if(!search){
           return toast.error("Please Enter something to search",{position:'top-left'})
        }
        const result = await userSearch(search)

        setSearchResult(result)
    }


  return (
       <div class="relative flex-col hidden h-full bg-white border-r border-gray-300 shadow-xl md:block transform transition-all duration-500 ease-in-out">
       <div class="flex justify-between px-3 pt-1 text-white">
           <div class="flex items-center w-full py-2">
               <div class="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
                   <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                       <button onClick={handleSearch} type="submit" class="p-1 focus:outline-none focus:shadow-none">
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
       <div class="border-b shadow-bot">
           <ul class="flex flex-row items-center px-2 list-none select-none">
               <li class="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
                   <a href='All' class="flex items-center justify-center py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-blue-500">
       
                   </a>
               </li>
       

           </ul>
       </div>
       <div class="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
           <ul class="flex flex-col w-full h-screen px-2 select-none">

              {
                searchResult && searchResult.map(user => (
                    <SearchChatCard key={user._id} user={user} handleFunction={() => dispatch(accessChat(user._id))}/>
                ))
              }
              {
                chats && chats.map(chat => (
                    <ChatCard key={chat._id} chat={chat} handleFunction={() => dispatch(accessChat(chat._id))} />
                ))  
              }
                           
               <li class="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200" >
                   <div class="flex justify-between w-full focus:outline-none">
                       <div class="flex justify-between w-full">
                           <div class="relative flex items-center justify-center w-12 h-12 ml-2 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full flex-no-shrink">
                               <img class="object-cover w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1589127097756-b2750896a728?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100" alt="" />
                               <div class="absolute bottom-0 right-0 flex items-center justify-center bg-white rounded-full">
                                   <div class="bg-green-500 rounded-full" ></div>
                               </div>
                           </div>
                           <div class="items-center flex-1 min-w-0">
                               <div class="flex justify-between mb-1">
                                   <h2 class="text-sm font-semibold text-black">Mark Green</h2>
                                   <div class="flex">
                                       <span class="ml-1 text-xs font-medium text-gray-600">05:41</span>
                                   </div>
                               </div>
                               <div class="flex justify-between text-sm leading-none truncate">
                                   <span>I do not remember anything</span>
                               </div>
                           </div>
                       </div>
                   </div>
               </li>
           </ul>
       </div>
       <div class="fixed bottom-0 right-0 z-40 mb-6 mr-4">
           <button class="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink">
               <svg class="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="24"
                   height="24" viewBox="0 0 24 24">
                   <path fill-rule="nonzero"
                       d="M3,17.46 L3,20.5 C3,20.78 3.22,21 3.5,21 L6.54,21 C6.67,21 6.8,20.95 6.89,20.85 L17.4562847,10.2933914 C17.6300744,10.1200486 17.6494989,9.85064903 17.514594,9.65572084 L17.4564466,9.58644661 L17.4564466,9.58644661 L14.4135534,6.54355339 C14.2182912,6.34829124 13.9017088,6.34829124 13.7064466,6.54355339 L3.15,17.1 C3.05,17.2 3,17.32 3,17.46 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.4835534,4.76644661 C15.2882912,4.96170876 15.2882912,5.27829124 15.4835534,5.47355339 L18.5264466,8.51644661 C18.7217088,8.71170876 19.0382912,8.71170876 19.2335534,8.51644661 L20.71,7.04 Z" />
               </svg>
           </button>
       </div>
   </div>

  )
}

export default ChatSide