import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import AddressForm from '../../components/order/AddressForm'
import AddressView from '../../components/order/AddressView'
import EditAddressForm from '../../components/order/EditAddressForm'
import { getAddresses, getAddressToEdit, razorpayPayment, verifyPayment } from './orderService'

const InvoiceCheckout = () => {

    const { id } = useParams();

    const pack = useSelector(state => state.packages[id])

    const {Invoice} = useSelector(state => state.packages)
    console.log(Invoice)

    const amount = useSelector(state => state.packages[id].total)

    const invoiceAmout = amount - Invoice.discount 

    const [from, setFrom] = useState(false)
    const [addresses, setAddresses] = useState()
    const [selectedAddress, setSelectedAddress] = useState()

    const [editAddress, setEditAddress] = useState()
    
    const navigate = useNavigate()

    const fetchData = async () => {
       const result = await getAddresses()
       setAddresses(result)
    }

    useEffect(() => {
      fetchData()
    
    },[editAddress, addresses])

    const initPayment = (order) => {
        const options = {
            key: 'rzp_test_0RoBfcJ7USDj54',
            amount: order.amount,
            currency: order.currency,
            name: 'username',
            description: "Test Transaction",
            order_id: order.id,
            handler: async (response) => {
                console.log(response)
                const data = await verifyPayment(response, pack, selectedAddress)
                if(data) {
                    navigate('/dash/success')
                } 
            },
            theme: {
                color: '#3399cc'
            }  
        }

        const rzp1 = new window.Razorpay(options)
        rzp1.open()  
    }
    const handleSelectAddress = (e) => {
        setSelectedAddress(e.target.value)
    }
    
    const handlePayment = async () => {
        if(!selectedAddress){
            return toast.error('Select an address')
        }
       const order =  await razorpayPayment(invoiceAmout)
       initPayment(order.data, pack, selectedAddress)
    }

    const handleGetAddressToEdit = async (addressId) => {
        console.log(addressId)
        const result = addresses.find(address => address._id === addressId)
        setEditAddress(result)
      }



  return (
    <div class="h-screen pt-20">
    <h1 class="mb-10 text-center text-2xl font-bold">Checkout</h1>
    <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div class="md:w-2/3">

          {!editAddress && !from &&
            <div id="dropdownHelperRadio" class="" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top">
              { addresses &&   addresses.map((address) => (
                <AddressView key={address._id} address={address} handleSelectAddress={handleSelectAddress} handleGetAddressToEdit={handleGetAddressToEdit}/>

                ))
                }
            </div>
          } 
            <div>
               {
                !editAddress && !from && <button onClick={() => setFrom(!from)}>Add new Address</button>
               } 
               {editAddress && <EditAddressForm editAddress={editAddress} setEditAddress={setEditAddress} />}
                {from && <AddressForm />}
            </div>
        </div>
        {/* <!-- Sub total --> */}
        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div class="mb-2 flex justify-between">
                <p class="text-gray-700">Subtotal</p>
                <p class="text-gray-700">$129.99</p>
            </div>
            <div class="flex justify-between">
                <p class="text-gray-700">Shipping</p>
                <p class="text-gray-700">$4.99</p>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
                <div className='flex-col'>
                <p class="text-lg font-bold">Orginal amount</p>
                <p class="text-lg font-bold">Discounted</p>
                </div>
                <div class="">
                    <p class="mb-1 text-lg font-bold">${pack.total} USD</p>
                    <p class="mb-1 text-lg font-bold">${invoiceAmout} USD</p>
                    <p class="text-sm text-gray-700">including VAT</p>
                    <button onClick={handlePayment} className="bg-blue-300 rounded-md p-2 px-4 mt-3 border border-black hover:text-white hover:border-white"> Pay Now</button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default InvoiceCheckout