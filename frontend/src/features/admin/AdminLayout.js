import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
// import Footer from "../../components/Footer"
// import TopBar from "../../components/TopBar"

import { ColorModeContext, useMode } from '../../components/admin/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import TopNav from '../../components/admin/TopNav'
import SideNav from "../../components/admin/SideNav";


const AdminLayout = () => {

  const navigate = useNavigate()

  const { admin } = useSelector((state) => state.adminAuth)

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login')
    }
  }, [admin, navigate])

  const [theme, colorMode] = useMode()

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='AdminLayout relative flex '>
          <SideNav />
          <main className='content h-full w-full'>
            <TopNav />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>



    // <>
    //   <TopBar user={false} admin={true}/>
    //   <div className="dash-container">
    //     {/* {admin && <Outlet />} */}
    //     <Outlet />
    //   </div>
    //   {/* <Footer /> */}
    // </>
  )
}

export default AdminLayout