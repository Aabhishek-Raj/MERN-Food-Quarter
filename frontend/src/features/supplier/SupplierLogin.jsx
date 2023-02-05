import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "./supplierSlice"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.min.css'


const initialState = {
  email: '',
  password: ''
}

const SupplierLogin = () => {

  const [formValue, setFormValue] = useState(initialState)
  
  const { email, password } = formValue

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {error, supplier} = useSelector((state) => state.supplier)

  useEffect(() => {
    error && toast.error(error)
    supplier && navigate('/supplier')
    
  }, [error, supplier, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
      dispatch(login(formValue))
  }

  const onInputChange = (e) => {
    setFormValue((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="selection:bg-rose-500 selection:text-white">
        <ToastContainer />
      <div className="min-h-screen bg-rose-100 flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="w-3/6 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
            <div className="relative h-48 bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] rounded-bl-4xl">
              <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
              <h1 className="text-2xl font-semibold text-gray-900">Welcome back!</h1>
              <form className="mt-12" action="" method="POST">
                <div className="relative">
                  <input id="email" name="email" type="text" value={email} onChange={onInputChange} required className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="john@doe.com" />
                  <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
                </div>
                <div className="mt-10 relative">
                  <input id="password" type="password" name="password" value={password} onChange={onInputChange} className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-blue-600" placeholder="Password" />
                  <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                </div>

                <button onClick={handleSubmit} className="mt-20 px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500 focus:ring-opacity-80 cursor-pointer" >Login</button>
              </form>
              <Link to='/supplier/register'>
                <p href="#" className="mt-4 block text-sm text-center font-medium text-blue-600-600 hover:underline focus:outline-none focus:ring-2 focus:ring-rose-500"> Don't have an acoount? Sign Up </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierLogin