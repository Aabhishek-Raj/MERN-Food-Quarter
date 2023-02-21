import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Error from '../../components/Error'   
import PackageCard from '../../components/package/PackageCard'
import Sidebar from '../../components/supplier/Sidebar'
import TopSupplier from '../../components/supplier/TopSupplier'
import PackageDetails from '../food/SuppliersFood'
import { getAllSuppliers } from '../user/userService'
import { reset } from '../food/foodSlice'
import Search from '../../components/user/Search'


const Welcome = () => {

  const [suppliers, setSuppliers] = useState()

  const [searchResult, setSearchResult] = useState()

  const { foods } = useSelector((state) => state.food)

  const dispatch = useDispatch()

  const fetchData = async () => {
    const suppliers = await getAllSuppliers()
    setSuppliers(suppliers)
  }

  useEffect(() => {
    fetchData()
  }, [dispatch])

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])


  const category = 'All'
  return (
    <>


{/* 
    <div className="relative flex bg-gradient-to-br from-[#a6d1e6] to-[#44abda]">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#a6d1e6] to-[#daecf4]"> */}
        {/* <Searchbar /> */}

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">


            {/* routes */}

            <div className='flex flex-col'>
              <div className='flex flex-'>
              </div>
              <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
                <h2 className='font-bold text-3xl text-black'>Discover {category}</h2>
                  <Search setSearchResult={setSearchResult} />
              </div>

              <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {
                  searchResult && searchResult.map(each => (
                    <PackageCard key={each._id} supplier={each} />
                  ))
                }
                {suppliers && (
                  suppliers.map(supplier => (
                    <PackageCard key={supplier._id} supplier={supplier} />
                  ))
                )}
                {
                  !suppliers && (
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
      {/* </div> */}

      {/* {activeSong?.title && ( */}
      <div className="">
        {/* <MusicPlayer /> */}
      </div>
    {/* </div> */}

    </>
  )
}

export default Welcome