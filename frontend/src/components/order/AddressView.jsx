import React from 'react'

const AddressView = ({ address, handleSelectAddress }) => {
  return (
    <>
      <ul class="w-full p-3 space-y-1 text-sm dark:text-gray-200" aria-labelledby="dropdownHelperRadioButton" >
      <li>
        <div class="w-full flex p-2 rounded">
          <div class="flex items-center h-5">
            <input id="helper-radio-4" name="helper-radio" type="radio" onChange={handleSelectAddress} value={address._id} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
          </div>
          <div class="ml-2 text-sm">
            <label for="helper-radio-4" class="font-medium text-gray-900 dark:text-gray-300">
              <div>


                <div class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl w-96 ">
                  <div class="flex items-start px-4 py-6">
                    {/* <img class="w-12 h-12 rounded-full object-cover mr-4 shadow" src="https://images.unsplash.com/photo-1542156822-6924d1a71ace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="avatar" /> */}
                    <div class="">
                      <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900 -mt-1">{address.name}</h2>
                        <small class="text-sm text-gray-700">{address.addressType}</small>
                      </div>
                      <p class="text-gray-700">{address.locality} </p>
                      <p class="mt-3 text-gray-700 text-sm">
                         {address.address} {address.district} {address.state} {address.landmark} 
                      </p>
                  
                    </div>
                  </div>
                </div>
              </div>

            </label>
          </div>
        </div>
      </li>
    </ul >

    
    </>
  )
}

export default AddressView




  // < ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria - labelledby="dropdownHelperRadioButton" >
  //     <li>
  //       <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
  //         <div class="flex items-center h-5">
  //             <input id="helper-radio-4" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
  //         </div>
  //         <div class="ml-2 text-sm">
  //             <label for="helper-radio-4" class="font-medium text-gray-900 dark:text-gray-300">
  //               <div>Individual</div>
  //               <p id="helper-radio-text-4" class="text-xs font-normal text-gray-500 dark:text-gray-300">Some helpful instruction goes over here.</p>
  //             </label>
  //         </div>
  //       </div>
  //     </li>
  //     <li>
  //       <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
  //         <div class="flex items-center h-5">
  //             <input id="helper-radio-5" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
  //         </div>
  //         <div class="ml-2 text-sm">
  //             <label for="helper-radio-5" class="font-medium text-gray-900 dark:text-gray-300">
  //               <div>Company</div>
  //               <p id="helper-radio-text-5" class="text-xs font-normal text-gray-500 dark:text-gray-300">Some helpful instruction goes over here.</p>
  //             </label>
  //         </div>
  //       </div>
  //     </li>
  //     <li>
  //       <div class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
  //         <div class="flex items-center h-5">
  //             <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
  //         </div>
  //         <div class="ml-2 text-sm">
  //             <label for="helper-radio-6" class="font-medium text-gray-900 dark:text-gray-300">
  //               <div>Non profit</div>
  //               <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500 dark:text-gray-300">Some helpful instruction goes over here.</p>
  //             </label>
  //         </div>
  //       </div>
  //     </li>
  //   </ul >
