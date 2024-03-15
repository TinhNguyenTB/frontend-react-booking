import { Routes, Route } from 'react-router-dom';
import HomePage from './container/home/HomePage';
import PageNotFound from './utils/PageNotFound';
import { path } from './utils/constant';
import Login from './container/system/auth/Login'

function App() {

  return (
    <Routes>
      <Route path={path.HOME} element={<HomePage />} />
      <Route path={path.DETAIL_DOCTOR} element={<HomePage />} />
      <Route path={path.LOGIN} element={<Login />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
