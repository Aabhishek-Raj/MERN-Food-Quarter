import { useState } from "react"
import { NavLink } from "react-router-dom"
import { RiCloseLine } from 'react-icons/ri'
import { HiOutlineMenu } from 'react-icons/hi'
import { AiFillShop } from "react-icons/ai";
import { GrBus } from "react-icons/gr";
import { ImHistory } from "react-icons/im";

// import { logo } from '../assets'

const handleClick = () => {}

const NavLinks = ({ handleClick }) => (
    <div className="mt-10">
        <NavLink className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-800 hover:text-[#5656b2]" onClick={() => handleClick && handleClick()}>
            <icon className="w-6 mr-2"><GrBus /></icon>
            Packages
        </NavLink>

        <NavLink className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-800 hover:text-[#5656b2]" onClick={() => handleClick && handleClick()}>
        <icon className="w-6 mr-2"><AiFillShop /></icon>
            Suppliers
        </NavLink>

        <NavLink className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-800 hover:text-[#5656b2]" onClick={() => handleClick && handleClick()}>
        <icon className="w-6 mr-2"><ImHistory /></icon>
            history
        </NavLink>
    </div>

)

const Sidebar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    return (
        <>
            <div className="md:flex hidden flex-col w-[240px] py-10 px-4  ">
                <img src="https://c8.alamy.com/comp/PCYG1J/pizzeria-fast-food-logo-or-label-happy-chef-holding-pizza-and-scapula-in-hands-vector-illustration-PCYG1J.jpg" alt="logo" className="w-full h-14 object-contain" />
                <NavLinks />


            </div>


            <div className="absolute md:hidden block top-6 right-3">
                <RiCloseLine className="w-6 h-6 text-white mr-2" />
            </div>

            <div className="absolute md:hidden block top-6 right-3">
                {mobileMenuOpen ? (
                    <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)}/>
                ) : <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)}/>}
            </div>


            <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/w0 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0': '-left-full' }`}>
                <img src="https://c8.alamy.com/comp/PCYG1J/pizzeria-fast-food-logo-or-label-happy-chef-holding-pizza-and-scapula-in-hands-vector-illustration-PCYG1J.jpg" alt="logo" className="w-full h-14 object-contain" />
                <NavLinks onClick handleClick={() => setMobileMenuOpen(false)}/>

            </div>

        </>
    )
}

export default Sidebar