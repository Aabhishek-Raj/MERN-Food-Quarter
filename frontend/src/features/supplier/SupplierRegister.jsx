import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from './supplierSlice'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

const initialState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  location: '',
  foodLicense: '',
  description: '',
  image: ''
}

const SupplierRegister = () => {

  const [formData, setFormData] = useState(initialState)

  const { name, email, password, phone, location, foodLicense, description, image } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, supplier } = useSelector((state) => state.supplier)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (supplier) {
      navigate('/supplier/login')
      toast.success('Succesfully registered.. Please wait for your verification')
    }

  }, [error, supplier, navigate])


  const onInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault() 
    dispatch(register({formData, navigate, toast}))

  }



  return (
    <div className="selection:bg-rose-500 selection:text-white">
      <ToastContainer />
      <div className="min-h-screen bg-rose-100 flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="w-full bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
            <div className="relative h-48 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] rounded-bl-4xl">
              <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
              <h1 className="text-2xl font-semibold text-gray-900">Please Register!</h1>
              <form className="mt-12" action="" method="POST">
                <div className='flex justify-evenly'>
                  <div className=" mt-10 relative w-1/3 ">
                    <input name="name" type="text" value={name} onChange={onInputChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="john@doe.com" />
                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
                  </div>
                  <div className="mt-10 relative w-1/3">
                    <input id="password" type="text" name="email" value={email} onChange={onInputChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Password" />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
                  </div>
                </div>
                <div className='flex justify-evenly'>
                  <div className="mt-10 relative w-1/3">
                    <input id="password" type="password" name="password" value={password} onChange={onInputChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Password" />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                  </div>
                  <div className="mt-10 relative w-1/3">
                    <input id="phone" type="text" name="phone" value={phone} onChange={onInputChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Password" />
                    <label htmlFor="text" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Contact No</label>
                  </div>
                </div>
                <div className='flex justify-evenly'>
                  <div className="mt-10 relative w-1/3">
                    <input id="location" type="text" name="location" value={location} onChange={onInputChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Password" />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Location</label>
                  </div>
                  <div className="mt-10 relative w-1/3 flex">
                    <div className="flex-col items-center">
                      <input id="password" type="file" name="foodLicense" value={foodLicense} onChange={onInputChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Password" />
                      <label htmlFor="password" className="text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">FSSAI License</label>
                    </div>
                  </div>
                </div>
                <div className='flex justify-evenly'> 
                  <div className="mt-10 relative w-1/3">
                    <input id="description" type="text" name="description" value={description} onChange={onInputChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Password" />
                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Description</label>
                  </div>
                  <div className="mt-10 relative w-1/3 flex">
                    <div className="flex-col items-center">
                      <input id="password" type="file" name="image" value={image} onChange={onInputChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Password" />
                      <label htmlFor="password" className="text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-800 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Images</label>
                    </div>
                  </div>
                </div>

                <button onClick={handleSubmit} className="ml-auto w-1/6 mt-14 px-4 py-2 rounded bg-[#44abda] hover:bg-blue-700 text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-80 cursor-pointer" >Register</button>
              </form>
              <Link to={'/supplier/login'}>
                <p href="#" className="mt-4 block text-sm text-center font-medium text-black hover:underline focus:outline-none focus:ring-2 focus:to-blue-900"> Already have an accound? Sign In </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierRegister