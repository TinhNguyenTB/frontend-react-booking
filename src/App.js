import { Routes, Route } from 'react-router-dom';
import HomePage from './container/home/HomePage';
import PageNotFound from './utils/PageNotFound';
import { path } from './utils/constant';
import Login from './container/system/auth/Login'
import DetailDoctor from './container/home/detail/DetailDoctor/DetailDoctor';

function App() {

  return (
    <Routes>
      <Route path={path.HOME} element={<HomePage />} />
      <Route path={path.DETAIL_DOCTOR} element={<DetailDoctor />} />
      <Route path={path.LOGIN} element={<Login />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
