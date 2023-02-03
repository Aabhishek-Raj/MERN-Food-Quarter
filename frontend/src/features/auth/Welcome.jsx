import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Error from '../../components/Error'   
import PackageCard from '../../components/PackageCard'
import Sidebar from '../../components/Sidebar'
import TopSupplier from '../../components/TopSupplier'
import PackageDetails from '../packages/PackageDetails'
import { getAllPackages } from '../packages/packageSlice'


const Welcome = () => {

  // const [packview, setPackview] = useState(false)

  const { packages } = useSelector((state) => state.package)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(getAllPackages())
    
  }, [dispatch])  


  const category = 'All'
  return (


    <div className="relative flex bg-gradient-to-br from-[#a6d1e6] to-[#44abda]">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#a6d1e6] to-[#daecf4]">
        {/* <Searchbar /> */}

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">


            {/* routes */}

            <div className='flex flex-col'>
              <div className='flex flex-'>
              </div>
              <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='font-bold text-3xl text-black'>Discover {category}</h2>
                <select onChange={() => { }} value='' className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:0 mt-5'>
                  {/* {category.map((variety) => <option key={category.value} value={category.value}>{category.title}</option>)} */}
                </select>
              </div>

              <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {packages.length > 0 ? (
                  packages.map(pack => (
                    <PackageCard  key={pack._id} pack={pack}/>

                  ))

                ): (
                  <h3>Sorry!! There is no packages available</h3>

                )}


              </div>
            </div>
            {/* route end */}

          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopSupplier />
          </div>
        </div>
      </div>

      {/* {activeSong?.title && ( */}
      <div className="">
        {/* <MusicPlayer /> */}
      </div>
    </div>
  )
}

export default Welcome