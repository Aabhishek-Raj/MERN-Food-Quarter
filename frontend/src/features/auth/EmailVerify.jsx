import React from 'react'
import { Link, useParams } from 'react-router-dom'

const EmailVerify = () => {
    const { reset } = useParams()
    return (
        <div className=' mt-16 flex-row align-middle relative flex bg-gradient-to-br from-#a6d1e6 to-#44abda w-full h-full justify-center items-center'>
            {
                reset && (
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-bold text-4xl text-center text-black'>Reset Your Password</h1>
                        <h2 className='font-serif font-semibold text-4xl text-center'>An Email with Password Reset link has been sent to your email</h2>
                        <h3 className='font-serif font-bold text-2xl text-center'>Please check your email </h3>
                    </div>
                )
            }
            {
                !reset && (
                    <div className='flex flex-col gap-6'>
                        <h1 className='font-bold text-4xl text-center text-black'>Account Confirmation</h1>
                        <h2 className='font-serif font-semibold text-4xl text-center'>An Email with your account confirmation link has been sent to your email</h2>
                        <h3 className='font-serif font-bold text-2xl text-center'>Check your email and come back to proceed</h3>
                        <div className=' mx-auto'>
                            <Link to={'/login'}>
                                <button className='text-semibold text-2xl bg-orange-500 p-2 px-9 rounded-3xl hover:bg-orange-400 mt-16'>Proceed</button>
                            </Link>
                        </div>
                    </div>
                )

            }
        </div>
    )
}

export default EmailVerify