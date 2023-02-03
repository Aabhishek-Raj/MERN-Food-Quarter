import React from 'react'
import { AiFillPhone, AiOutlineClockCircle } from 'react-icons/ai'
import { BsChatSquareDots } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout as supplierlogout } from '../features/supplier/supplierSlice'
import { logout as userlogout } from '../features/auth/authSlice'

const TopBar = ({ supplier, user }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(userlogout())
        navigate('/')
    }
    const handleSupplierLogout = () => {
        dispatch(supplierlogout())
        navigate('/supplier/login')
    }
    
    return (
        <div className='flex justify-between items-center px-4 py-2 bg-[#5f7c9c]'>
            <div className='flex items-center'>
                <BsChatSquareDots size={30} className='text-[--primary-dark] mr-2' />
                <h1 className='text-xl font-bold text-gray-700'>FOOD Quarter</h1>
            </div>
            <div className='flex'>
                <div className='hidden md:flex items-center px-6'>
                    <AiOutlineClockCircle size={20} className='mr-2 text-[var(--primary-dark)]' />
                    <p className='text-sm text-gray-700'>24 / 7</p>
                </div>
                <div className='hidden md:flex items-center px-6'>
                    <AiFillPhone size={20} className='mr-2 text-[var(--primary-dark)]' />
                    <p className='text-sm text-gray-700'>9072457068</p>
                </div>
                {supplier && <button onClick={handleSupplierLogout}>supplier Logout</button>}
                {user && <button onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    )
}

export default TopBar