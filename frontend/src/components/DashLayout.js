import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import TopBar from "./TopBar"

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
      <TopBar supplier={false} user={true}/>
      <div className="dash-container">
        {user && <Outlet />}
      </div>
      <Footer />
    </>
  )
}

export default DashLayout