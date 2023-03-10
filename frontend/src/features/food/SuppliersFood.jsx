import { useState } from 'react'
// import { useMemo } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import SingleItem from '../../components/package/SingleItem'
import Search from '../../components/user/Search'
import { getSupplierFoods, setFoods } from './foodSlice'

const SuppliersFood = ({ user }) => {

  const [supplyFood, setSupplyFood] = useState([]);

  const [foodSearchResult, setFoodSearchResult] = useState()

  const { foods } = useSelector((state) => state.food)
  const { id } = useParams();

  const dispatch = useDispatch()


  useEffect(() => {
   dispatch(getSupplierFoods(id))

  }, [dispatch, id]);

  return (
    <div className='h-[705px] overflow-y-scroll hide-scrollbar'>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mx-10 '>
        <div className='py-2 flex-1 flex flex-col items-start justify-center gap-6'>

              <Search item setFoodSearchResult={setFoodSearchResult}/>

          <p className='text-[2.5rem] md:text-[4.5rem] font-bold tracking-wide text-headingColor'> The Fastest Delivery in <span className='text-orange-600 text-[3rem] md:text-[5rem]'>{supplyFood.packagename}</span></p>
          <p className='text-base text-gray-500 text-center md:text-left md:w-[80%]'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, aut?</p>

         
              <Link to={`/dash/package/${id}`}>
                <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>View package</button>
              </Link>

        </div>
        {/* <div className='py-2 bg-blue-400 flex-1'></div> */}
      </div>
      {foods && (<div className='max-w-[1640px] pt-16 mx-auto p-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-12'>
        {
          foodSearchResult && foodSearchResult.map(item => (
            <SingleItem item={item}/>
          ))
        }
        {
          foods.map(item => (

            <SingleItem item={item} />
          ))
        }
      </div>) 
      }
      {
        !foods && (
          <div> Sory no items from this supplier</div>
        )
      }

    </div>

  )
}

export default SuppliersFood