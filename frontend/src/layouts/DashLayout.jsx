import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Sidebar from "../components/supplier/Sidebar"
import TopBar from "../components/TopBar"

const DashLayout = () => {

  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])


  return (
    <>


      <div className="flex flex-col min-h-screen">
        <TopBar supplier={false} user={true} />
        <div className="dash-container flex-grow bg-gradient-to-br from-[#a6d1e6] to-[#daecf4]">
          <div className="relative flex">
            <div className="">
            <Sidebar />
            </div>

            <div className="flex-1 flex flex-col">
              {/* <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40"> */}
              {user && <Outlet />}
            </div>
          </div>
          {/* </div>
      </div> */}
        </div>
        <Footer />

      </div>
    </>
  )
}

export default DashLayout