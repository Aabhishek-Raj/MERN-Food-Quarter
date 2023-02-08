import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"


const PackageCard = ( props ) => {
  return (

    <>
      <div className="w-full mx-auto px-4 grid md:grid">
          <Link to={`/dash/foods/${props.supplier._id}`}>
        <div className="border shadow-lg rounded-lg hover:scale-105 duration-300 relative bg-[#5f7c9c]">
          <div className="absolute w-full h-full rounded-xl text-base">
            <p className="font-bold text-2xl px-2 pt-4">{props.supplier.name}</p>
            <p className='px-2'>Through 8/26</p>
          </div>
          <img className="w-full h-[200px] object-cover rounded-t-lg" src={`http://localhost:4000/images/${props.supplier.license}` }alt="/" />
            <div className="flex px-2 py-4">
              <p className=" ">
                <span className="border border-white bg-[#5f7c9c] text-base p-2 rounded-full">price$$</span>
              </p>
              <p className="font-bold pl-3">{props.supplier.variety}</p>

              <button className="ml-auto border rounded-xl px-5 py-1 border-black bg-white text-black mx-2">View supplier </button>
            </div>
        </div>
          </Link>
      </div>






    </>
  )
}

export default PackageCard

