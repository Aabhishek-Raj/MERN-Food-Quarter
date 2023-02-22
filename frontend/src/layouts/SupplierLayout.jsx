import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import TopBar from "../components/TopBar"
import { AiOutlineClose, AiOutlineSearch, AiFillTag, AiOutlineMenu } from 'react-icons/ai'
import { BsFillCartFill, BsFillSave2Fill } from "react-icons/bs"
import { TbTruckDelivery } from "react-icons/tb"
import { FaUserFriends, FaWallet } from "react-icons/fa"
import { MdFavorite, MdHelp } from "react-icons/md"
import { useState } from "react"


const SupplierLayout = () => {

  const { supplier } = useSelector((state) => state.supplier)

  const [nav, setNav] = useState(false)


  return (
    <div>
      <TopBar supplier={true} user={false} />

      {/* Left Side */}
      <div className="flex items-center mx-10">
        {/* <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={25} />
        </div> */}

        {/* Search input */}
{/* 
        <div className="bg-gray-200 ml-auto flex rounded-full items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px] ">
          <AiOutlineSearch size={25} />
          <input className="bg-transparent p-2 w-full focus:outline-none" type="text" placeholder="Search foods" />
        </div> */}

        {/* cart button */}
        {/* <button className="bg-black ml-auto   text-white hidden md:flex items-center px-4 py-2 rounded-full"> <BsFillCartFill size={20} className="mr-2" />Orders</button> */}
      </div>

      {/* MObile MenuU */}
      {/* overlay */}
      {nav ?
        <div className="bg-black/80 fixed w-full h-screen top-0 left-0">
        </div>
        : ''}

      {/* side drawer */}
      <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'}>
        <AiOutlineClose onClick={() => setNav(!nav)} size={30} className="absolute right-4 top-4 cursor-pointer" />
        <h2 className="text-2xl p-4">Package<span className="font-bold">name</span></h2>
        <nav>
          <ul className="flex flex-col p-4 text-gray-800">
            <li className="text-xl py-4 flex"><TbTruckDelivery size={25} className="mr-4" />Home</li>
            <li className="text-xl py-4 flex"><MdFavorite size={25} className="mr-4" />Profile</li>
            <li className="text-xl py-4 flex"><FaWallet size={25} className="mr-4" />sales</li>
            <li className="text-xl py-4 flex"><AiFillTag size={25} className="mr-4" />History</li>
            <li className="text-xl py-4 flex"><BsFillSave2Fill size={25} className="mr-4" />promotions</li>
            <li className="text-xl py-4 flex"><MdHelp size={25} className="mr-4" />Best ones</li>
            <li className="text-xl py-4 flex"><FaUserFriends size={25} className="mr-4" />invites</li>
          </ul>
        </nav>
      </div>
      <div className="dash-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default SupplierLayout