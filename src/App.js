import { Routes, Route } from 'react-router-dom';
import HomePage from './container/home/HomePage';
import PageNotFound from './container/pages/PageNotFound';
import { path } from './utils/constant';
import Login from './container/system/auth/Login'
import DetailDoctor from './container/home/detail/DetailDoctor/DetailDoctor';
import DetailSpecialty from './container/home/detail/DetailSpecialty/DetailSpecialty';
import DetailClinic from './container/home/detail/DetailClinic/DetailClinic';
import System from './routes/System';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function App() {
  const isLogin = useSelector(state => state.user.isLogin);
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    setScrollHeight(windowHeight);
  }, [isLogin])

  return (
    <Scrollbars autoHide style={{ height: scrollHeight }}>
      <Routes>
        <Route path={path.HOME} element={<HomePage />} />
        <Route path={path.DETAIL_DOCTOR} element={<DetailDoctor />} />
        <Route path={path.DETAIL_SPECIALTY} element={<DetailSpecialty />} />
        <Route path={path.DETAIL_CLINIC} element={<DetailClinic />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.SYSTEM} element={<System />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Scrollbars>
  );
}

export default App;
