import { Route, Routes } from 'react-router-dom'
import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
// import Package from "./features/packages/Package";
import Public from './components/Public';
import UsersList from './features/users/UsersList'
import Register from './features/auth/Register';
import AdminLogin from './features/admin/AdminLogin';
import AdminLayout from './features/admin/AdminLayout';
import PackageDetails from './features/packages/PackageDetails';

// import { ColorModeContext, useMode } from './components/admin/theme';
// import { CssBaseline, ThemeProvider } from '@mui/material';

import DashBoard from './components/admin/DashBoard';
import SuppliersView from './components/admin/SuppliersView';
import Verifications from './components/admin/Verifications';
import Form from './components/admin/Form'
import Pie from './components/admin/Pie';
import Bar from './components/admin/Bar';
import Line from './components/admin/Line';
import FAQ from './components/admin/FAQ';
import Calendar from './components/admin/Calendar';
import Geography from './components/admin/Geography';
import SupplierHome from './features/supplier/SupplierHome';
import SupplierLayout from './components/SupplierLayout';
import SupplierRegister from './features/supplier/SupplierRegister';
import SupplierLogin from './features/supplier/SupplierLogin';
import UsersView from './components/admin/UsersView';
import { ToastContainer } from 'react-toastify';
import CreatePackage from './features/packages/CreatePackage';
import AddItems from './features/packages/AddItems';
import EmailVerify from './features/auth/EmailVerify';
import Reset from './features/auth/Reset';
import ChangePwd from './features/auth/ChangePwd';



function App() {
  return (
    <div>
      <ToastContainer />  
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="reset" element={<Reset />} />
          <Route path="change/:id/:OTP" element={<ChangePwd />} />
          <Route path="verify/:reset?" element={<EmailVerify />} />
          <Route path="register" element={<Register />} />
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />
            <Route path='package/:id' element={<PackageDetails user={true}/>} />


          </Route>  {/* End of Dash */}
        </Route>

        {/* Supplier */}
        <Route path='/supplier' element={<SupplierLayout />}>
          <Route index element={<SupplierHome />} />
          <Route path="create" element={<CreatePackage />} />
          <Route path="additems/:id" element={<AddItems />} />
          <Route path="package/:id" element={<PackageDetails />} />
          <Route path="register" element={<SupplierRegister />} />
          <Route path="login" element={<SupplierLogin />} />
        </Route>



        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="users" element={<UsersView />} />
          <Route path="suppliers" element={<SuppliersView />} />
          <Route path="verify" element={<Verifications />} />
          <Route path="form" element={<Form />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
          <Route path="line" element={<Line />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="geography" element={<Geography />} />
          <Route path="login" element={<AdminLogin />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
