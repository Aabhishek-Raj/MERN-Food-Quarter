import React from 'react'
import { useState } from 'react'
import { createAddress } from '../../features/order/orderService'


const initialState = {
    name: '',
    phoneNo: '',
    locality: '',
    address: '',
    pincode: '',
    district: '',
    state: '',
    landmark: '',
    alternatephone: '',
    addressType: ''
}

const AddressForm = () => {

    const [formData, setFormData] = useState(initialState)

    const  {name, phoneNo,locality, address, pincode, district, state, landmark, alternatephone, addressType} = formData


    const handleInputChange = (e) => {
        setFormData((prevstate) => ({
            ...prevstate,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        await createAddress(formData)
    }

    return (
        <div class="flex items-center justify-center p-12">

            <div class="mx-auto w-full max-w-[550px]">
                <form action="https://formbold.com/s/FORM_ID" method="POST">
                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="fName"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={handleInputChange}
                                    id="fName"
                                    placeholder="First Name"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="lName"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Phone No:
                                </label>
                                <input
                                    type="text"
                                    name="phoneNo"
                                    value={phoneNo}
                                    onChange={handleInputChange}
                                    id="lName"
                                    placeholder="Phone No:"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="mb-5">
                        <label
                            for="guest"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Locality
                        </label>
                        <input
                            type="text"
                            name="locality"
                            value={locality}
                            onChange={handleInputChange}
                            id="guest"
                            placeholder="Enter Locality"
                            min="0"
                            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div class="mb-5">
                        <label
                            for="guest"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={handleInputChange}
                            id="guest"
                            placeholder="Address"
                            min="0"
                            class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>

                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="date"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={pincode}
                                    onChange={handleInputChange}
                                    id="date"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="time"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    District
                                </label>
                                <input
                                    type="text"
                                    name="district"
                                    value={district}
                                    onChange={handleInputChange}
                                    id="time"
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>

                    </div>
                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="fName"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={state}
                                    onChange={handleInputChange}
                                    id="fName"
                                    placeholder=""
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="lName"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Landmark
                                </label>
                                <input
                                    type="text"
                                    name="landmark"
                                    value={landmark}
                                    onChange={handleInputChange}
                                    id="lName"
                                    placeholder=""
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="-mx-3 flex flex-wrap">
                        <div class="w-full px-3 sm:w-1/2">
                            <div class="mb-5">
                                <label
                                    for="fName"
                                    class="mb-3 block text-base font-medium text-[#07074D]"
                                >
                                    Alternate No:
                                </label>
                                <input
                                    type="text"
                                    name="alternatephone"
                                    value={alternatephone}
                                    onChange={handleInputChange}
                                    id="fName"
                                    placeholder=""
                                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                    <div class="mb-5 mt-7 ml-9">
                        <label class="mb-3 block text-base font-medium text-[#07074D]">
                            Choose an Address Type
                        </label>
                        <div class="flex items-center space-x-6">
                            <div class="flex items-center">
                                <input
                                    type="radio"
                                    name="addressType"
                                    value="Home"
                                    onChange={handleInputChange}
                                    id="radioButton1"
                                    class="h-5 w-5"
                                />
                                <label
                                    for="radioButton1"
                                    class="pl-3 text-base font-medium text-[#07074D]"
                                >
                                    Home
                                </label>
                            </div>
                            <div class="flex items-center">
                                <input
                                    type="radio"
                                    name="addressType"
                                    value="Other"
                                    onChange={handleInputChange}
                                    id="radioButton2"
                                    class="h-5 w-5"
                                />
                                <label
                                    for="radioButton2"
                                    class="pl-3 text-base font-medium text-[#07074D]"
                                >
                                    Other
                                </label>
                            </div>
                        </div>
                    </div>
                    </div>


                    <div>
                        <button onClick={handleSubmit}
                            class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddressForm