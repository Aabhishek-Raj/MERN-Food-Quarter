import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const initialState = {
    ifPerson: '',
    discount: '',
    forPerson: '',
}

const InvoiceCreate = ({setInvoice, setInvoiceData}) => {

    const supplier = useSelector(state => state.supplier.supplier)


    const [formData, setFormData] = useState(initialState)


    const {ifPerson, discount, forPerson } = formData

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name]: e.target.value
        }))
    }
 
    const handleSend = (e) => {
        e.preventDefault()
        const updatedData = { 
            ...formData, supplierId: supplier.supplier._id, supplierName: supplier.supplier.name
        }
        setInvoiceData(updatedData)
    }


    return (
        <>
            <div class="antialiased sans-serif min-h-screen bg-white">
                <div class="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full">
                <div class="p-4 max-w-xl mx-auto relative left-0 right-0 overflow-hidden mt-24">
                    <button onClick={() => setInvoice(false)} class="shadow absolute right-0 top-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer">
                        <svg class="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                        </svg>
                    </button>

                    <div class="shadow w-full rounded-lg bg-white overflow-hidden block p-8">

                        <h2 class="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Create An Invoice</h2>

                        <div class="mb-4 flex">
                            <label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">If</label>
                            <input value={ifPerson} name='ifPerson' onChange={handleChange} class="mb-1 ml-4 mr-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" x-model="item.name"/>
                            <p className='text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide ml-1'>+</p>
                            <p className='text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide'>Persons</p>
                        </div>

                        <div class="flex justify-evenly pt-6">
                                <label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Rs.</label>
                            <div class="mb-4 w-32 mr-2">
                                <input value={discount} name="discount" onChange={handleChange} class="text-right mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" id="inline-full-name" type="text" x-model="item.qty"/>
                            </div>

                                <label class="text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">Discount For</label>
                            <div class="mb-4 w-32">
                            <select value={forPerson} name="forPerson" onChange={handleChange} class="text-gray-700 block appearance-none w-full bg-gray-200 border-2 border-gray-200 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500" x-model="item.gst">
								<option value="1">EACH</option>
								<option value="2">2</option>
								<option value="3">3</option>
							</select>
                            </div>
                            <label class=" text-gray-800 block mb-1 font-bold text-sm uppercase tracking-wide">person</label>
                        </div>

                        <div class="mt-8 text-right">
                            <button type="button" class="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm mr-2">
                            Cancel
                        </button>
                        <button onClick={handleSend} type="button" class="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded shadow-sm">
                        Send
                    </button>
                </div>
            </div>
        </div >
		</div >
    {/* // <!-- /Modal --> */ }

	</div >

    </>
  )
}

export default InvoiceCreate