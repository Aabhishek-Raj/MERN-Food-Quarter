import { Route, Routes } from 'react-router-dom'
import Layout from "./layouts/Layout";
import Login from "./features/user/Login";
import DashLayout from "./layouts/DashLayout";
import Welcome from "./features/user/Welcome";
// import Package from "./features/packages/Package";
import Public from './components/Public';
// import UsersList from './features/users/UsersList'
import Register from './features/user/Register';
import AdminLogin from './features/admin/AdminLogin';
import AdminLayout from './layouts/AdminLayout';
import SuppliersFood from './features/food/SuppliersFood';

// import { ColorModeContext, useMode } from './components/admin/theme';
// import { CssBaseline, ThemeProvider } from '@mui/material';
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
import SupplierLayout from './layouts/SupplierLayout';
import SupplierRegister from './features/supplier/SupplierRegister';
import SupplierLogin from './features/supplier/SupplierLogin';
import UsersView from './components/admin/UsersView';
import { ToastContainer } from 'react-toastify';
import AddItems from './features/food/AddItems'; 
import EmailVerify from './features/user/EmailVerify';
import Reset from './features/user/Reset';
import ChangePwd from './features/user/ChangePwd';
import CreateFood from './features/food/CreateFood'
import ManagePackage from './features/package/ManagePackage';
import SinlgeView from './features/food/SinlgeView';
import ChatPage from './features/chat/ChatPage';
import CheckOut from './features/order/CheckOut';
import Success from './components/order/Success';
import OrderFullView from './components/order/OrderTable';
import Dashboard from './features/admin/Dashboard';
import OrderTable from './components/order/OrderTable';
import OrderHistory from './components/order/OrderHistory';
import InvoiceCheckout from './features/order/InvoiceCheckout';
import SalesReport from './components/admin/SalesReport';



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
            <Route path='foods/:id' element={<SuppliersFood/>} />
            <Route path='single/:id?' element={<SinlgeView/>} />
            <Route path='package/:id' element={<ManagePackage/>} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="checkout/:id" element={<CheckOut/>} />
            <Route path='success' element={<Success />} /> 
            <Route path="history" element={<OrderTable/>} />
            <Route path="invoicepay/:id" element={<InvoiceCheckout/>} />


          </Route>  {/* End of Dash */}
        </Route>

        {/* Supplier */}
        <Route path='/supplier' element={<SupplierLayout />}>
          <Route index element={<SupplierHome />} />
          <Route path="create" element={<CreateFood/>} />
          <Route path="order" element={<ManagePackage/>} />
          <Route path="additems/:id" element={<AddItems />} />
          <Route path="register" element={<SupplierRegister />} />
          <Route path="login" element={<SupplierLogin />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="orderview/:id" element={<OrderHistory />} />
        </Route>



        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersView />} />
          <Route path="suppliers" element={<SuppliersView />} />
          <Route path="line" element={<Line />} />
          <Route path="salesreport" element={<SalesReport />} />
          <Route path="form" element={<Form />} />
          <Route path="bar" element={<Bar />} />
          <Route path="pie" element={<Pie />} />
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
