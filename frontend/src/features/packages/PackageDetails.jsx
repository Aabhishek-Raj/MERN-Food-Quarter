import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import SingleItem from '../../components/package/SingleItem'

const PackageDetails = ({user}) => {

  const { id } = useParams()

  const { packages } = useSelector((state) => state.package)
  const pack = packages.find((pack) => pack._id === id)

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mx-10'>
        <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>
          <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full'>
            <p className='text-base text-orange-500 fond-semibold'>{pack.variety}</p>
            <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
              <img className='w-full h-full object-contain' src="" alt="delivery" />

            </div>
          </div>
          <p className='text-[2.5rem] md:text-[4.5rem] font-bold tracking-wide text-headingColor'> The Fastest Delivery in <span className='text-orange-600 text-[3rem] md:text-[5rem]'>{pack.packagename}</span></p>
          <p className='text-base text-gray-500 text-center md:text-left md:w-[80%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut?</p>

          {
            user ? (
              <Link to={`/supplier/additems/${id}`}>
              <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>BOOK this package</button>
            </Link>
            ): (
          <Link to={`/supplier/additems/${id}`}>
            <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>Add more products</button>
          </Link>

            )
          }
        </div>
        <div className='py-2 bg-blue-400 flex-1'></div>
      </div>
      <div className='max-w-[1640px] pt-16 mx-auto p-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-12'>
        {
          pack.FoodItems.map(item => (

            <SingleItem item={item} />
          ))
        }
      </div>
      
    </>

  )
}

export default PackageDetails