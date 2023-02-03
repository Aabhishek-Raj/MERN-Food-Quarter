import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"


const PackageCard = ( props ) => {
  return (

    <>
      <div className="w-full mx-auto px-4 grid md:grid">
          <Link to={`/dash/package/${props.pack._id}`}>
        <div className="border shadow-lg rounded-lg hover:scale-105 duration-300 relative bg-[#5f7c9c]">
          <div className="absolute w-full h-full rounded-xl text-base">
            <p className="font-bold text-2xl px-2 pt-4">{props.pack.packagename}</p>
            <p className='px-2'>Through 8/26</p>
          </div>
          <img className="w-full h-[200px] object-cover rounded-t-lg" src="https://images.unsplash.com/photo-1613769049987-b31b641f25b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80" alt="/" />
            <div className="flex px-2 py-4">
              <p className=" ">
                <span className="border border-white bg-[#5f7c9c] text-base p-2 rounded-full">price$$</span>
              </p>
              <p className="font-bold pl-3">{props.pack.variety}</p>

              <button className="ml-auto border rounded-xl px-5 py-1 border-black bg-white text-black mx-2">BOOK NOW </button>
            </div>
        </div>
          </Link>
      </div>






    </>
  )
}

export default PackageCard

