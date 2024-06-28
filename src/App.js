import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './container/home/HomePage';
import PageNotFound from './container/pages/PageNotFound';
import { path } from './utils/constant';
import Login from './container/system/auth/Login'
import DetailDoctor from './container/home/detail/DetailDoctor/DetailDoctor';
import DetailSpecialty from './container/home/detail/DetailSpecialty/DetailSpecialty';
import DetailClinic from './container/home/detail/DetailClinic/DetailClinic';
import System from './routes/System';
import { Scrollbars } from 'react-custom-scrollbars';
import { useEffect } from 'react';
import VerifyEmail from './container/pages/VerifyEmail';
import { useDispatch } from 'react-redux';
import { fetchUserAccount } from './redux/actions/accountAction';
import About from './container/pages/About';
import Register from './container/pages/Register';
import ChangePassword from './container/pages/ChangePassword';
import Histories from './container/pages/Histories';
import Appointment from './container/pages/Appointment';
import AllDoctor from './container/pages/AllDoctor';
import AllClinic from './container/pages/AllClinic';
import AllSpecialty from './container/pages/AllSpecialty';


function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.startsWith('/') || location.pathname === '/login') {
      dispatch(fetchUserAccount())
    }
  }, [])


  return (
    <Scrollbars autoHide style={{ height: '100vh' }}>
      <Routes>
        <Route path={path.HOME} element={<HomePage />} />
        <Route path={path.ABOUT} element={<About />} />
        <Route path={path.DETAIL_DOCTOR} element={<DetailDoctor />} />
        <Route path={path.DETAIL_SPECIALTY} element={<DetailSpecialty />} />
        <Route path={path.DETAIL_CLINIC} element={<DetailClinic />} />
        <Route path={path.VERIFY_EMAIL_BOOKING} element={<VerifyEmail />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.HISTORIES} element={<Histories />} />
        <Route path={path.APPOINTMENT} element={<Appointment />} />
        <Route path={path.ALL_DOCTOR} element={<AllDoctor />} />
        <Route path={path.ALL_CLINIC} element={<AllClinic />} />
        <Route path={path.ALL_SPECIALTY} element={<AllSpecialty />} />
        <Route path={path.CHANGE_PASSWORD} element={<ChangePassword />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route path={path.SYSTEM} element={<System />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Scrollbars>
  );
}

export default App;
