import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteItem } from '../../features/food/foodSlice'


const Singlepack = ({ food, editOption }) => {  
  
  
  const dispatch = useDispatch()
  
  const handleDelete = async (foodId) => {
    await dispatch(deleteItem(foodId))
  }


  return (
    <div className="rounded-xl relative">
      <button className='mb-5 bg-red-600 absolute left-0'>
      </button>
      <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
        <p className="font-bold text-2xl px-2 pt-4">{food.name}</p>
        <p className="px-2">{food.variety}</p>
        <div className='flex justify-evenly'>
          <div>
                  {
                    editOption &&  <button className=" ml-auto border rounded-xl px-7 py-1 border-white bg-white text-black mx-2 absolute bottom-4">Update</button>
                  }
          </div>
          <div>
                  {
                    editOption &&    <button onClick={() => handleDelete(food._id)} className="border rounded-xl px-5 py-1 border-white bg-white text-black mx-2 absolute bottom-4">Delete</button>
                  }
          </div>
        </div>
      </div>
      <img className="max-h-[200px] md:max-h-[250px] w-full object-cover rounded-xl" src={`http://localhost:4000/images/${food.image}`} alt="/" />
    </div>
  )
}

export default Singlepack