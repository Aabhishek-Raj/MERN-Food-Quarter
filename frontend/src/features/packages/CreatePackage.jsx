import { useState } from 'react'
import { motion } from 'framer-motion'
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md'
import Loader from '../../components/package/Loader'
import { useDispatch } from 'react-redux'
import { createPackage } from './packageSlice'

const CreatePackage = () => {

    const [packagename, setPackagename] = useState('')
    const [variety, setVariety] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState(null)
    const [image, setImage] = useState(null)
    const [fields, setFields] = useState(false)
    const [alertStatus, setAlertStatus] = useState("danger")
    const [msg, setMsg] = useState(null)
    const [isloading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const uploadImage = (e) => {
        setIsLoading(true)
        const imageFile = e.target.files[0]
        console.log(imageFile.name)
        setImage(imageFile)
    }

    const deleteImage = () => {}

    const saveDetails = () => {

        const formData = new FormData()
        formData.append('packagename', packagename)
        formData.append('variety', variety)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('image', image)

        dispatch(createPackage(formData))

    }


    return (
        <div className='w-full min-h-screen flex items-center justify-center'>
            <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col item-center justify-center gap-4'>
                {
                    fields && (
                        < motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`w-full p-2 rounded-lg text-center text-lg
        font-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>
                            {msg}
                        </ motion.p>
                    )
                }
                <div className='w-full py-2 border-b border-green-300 flex items-center gap-2 '>
                    <MdFastfood className='text-xl text-gray-700' />
                    <input type="text" required name='packagename' value={packagename}
                        onChange={(e) => setPackagename(e.target.value)}
                        placeholder='Give a package name...' className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-400 text-gray-600' />
                </div>
                <div className='w-full'>
                    <select onChange={(e) => setCategory(e.target.value)} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
                        <option value="other" className='bg-white'> Select Category</option>
                        {category && category.map(item => (
                            <option key={item.id} className="text-base border-0 outline-none capitalize bg-white text-gray-500" value="item.urlParamName"></option>
                        ))}
                    </select>
                </div>

                <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-96 md:h-96 cursor-pointer rounded-lg'>
                    {isloading ? <Loader />: <>
                    {!image ? <>
                    <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                        <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                            <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' /> 
                            <p className='text-gray-500 hover:text-gray-700'>Click here to Upload</p>

                        </div>
                        <input type="file" name='uploadimage' accept='image/*' onChange={uploadImage} className='w-0 h-0'/>
                    </label>
                    </>: <>
                    <div className='relative h-full '>
                        <img className='w-full h-full object-cover ' src={image} alt="uploaded img" />
                        <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out' onClick={deleteImage}><MdDelete className='text-white '/></button>
                    </div>
                    </>}
                    </>}
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3 '>
                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2 '>
                        <MdAttachMoney className='text-gray-700 text-2xl'/>
                        <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder='amount' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600 ' />
                    </div>

                    <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2 '>
                        <MdFoodBank className='text-gray-700 text-2xl'/>
                        <input type="text" required value={variety} onChange={(e) => setVariety(e.target.value)} placeholder='Price' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-gray-600 ' />

                    </div>
                </div>

                <div className='flex items-center w-full'>
                    <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveDetails}>Create</button>
                </div>

            </div>
        </div>
    )
}

export default CreatePackage