import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, FreeMode } from "swiper"
import 'swiper/css'
import 'swiper/css/free-mode'
import { getAllSuppliers } from "../../features/user/userService"
import { useState } from "react"


const TopChartCard = ({data}) => (
   data && (<div className="w-full flex flex-row items-center hover:bg-[#5f7c9c] py-2 p-4 rounded-lg cursor-pointer mb-2">
        <h3 className="font-bold text-base text-gray-600 mr-3 ">1.
        </h3>
        <div className="flex-1 flex flex-row justify-between items-center">
            <img className="w-20 h-20 rounded-lg" src="https://dynamic.brandcrowd.com/asset/logo/1fca0e4a-72e3-4518-aae7-8165877cf51d/logo-search-grid-1x?v=637811318756800000" alt="supplierimage" />
            <div className="flex-1 flex flex-col justify-center mx-3 ">
                <Link to={'/supplier'}>
                    <p className="text-xl font-bold text-gray-800">{data.name}</p>
                </Link>
                <Link to={'/supplier'}>
                    <p className="text-base text-gray-800 mt-1">supplierName</p>
                </Link>
            </div>
        </div>
        {data.name}

    </div>)
)


const TopSupplier = () => {

    const [datas, setDatas] = useState()

    const fetchData = async () => {
        const datas = await getAllSuppliers()
        setDatas(datas)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const divRef = useRef(null)

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' })
    })

    return (
        <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
            <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-black fond-bold text-2xl">{}</h2>
                    <Link to={'/suppliers'}>
                        <p className="text-gray-300 text-base cursor-pointer">See more</p>
                    </Link>
                </div>


                <div className="mt-4 flex flex-col gap-1 ">
                    {datas &&
                        datas.map((data) => (

                            <TopChartCard key={data._id} data={data} />

                        ))
                    }

                </div>
            </div>

            {/* Top Chefs */}

            {/* <div className="w-full flex flex-col mt-8">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-black fond-bold text-2xl">Recommended</h2>
                    <Link to={'/chefs'}>
                        <p className="text-gray-800 text-base cursor-pointer">See more</p>
                    </Link>
                </div>

                <Swiper slidesPerView="auto" spaceBetween={15} freeMode centeredSlides centeredSlidesBounds modules={[FreeMode]} className="mt-4">

                    <SwiperSlide style={{ width: '25%', height: 'auto' }} className="shadow-lg rounded-full animate-slideright">
                        <Link to={`/supplier`}>
                            <img src="https://www.shutterstock.com/image-photo/excited-man-chef-cook-wearing-260nw-1244060161.jpg" alt="name" className="rounded-full w-full object-cover" />
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide style={{ width: '25%', height: 'auto' }} className="shadow-lg rounded-full animate-slideright">
                        <Link to={`/supplier`}>
                            <img src="https://www.shutterstock.com/image-photo/excited-man-chef-cook-wearing-260nw-1244060161.jpg" alt="name" className="rounded-full w-full object-cover" />
                        </Link>
                    </SwiperSlide>

                </Swiper>

            </div> */}


        </div>
    )
}

export default TopSupplier