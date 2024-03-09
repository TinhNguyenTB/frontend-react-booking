import { Routes, Route } from 'react-router-dom';
import HomePage from './container/home/HomePage';
import PageNotFound from './utils/PageNotFound';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
