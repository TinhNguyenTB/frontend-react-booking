import { Routes, Route } from 'react-router-dom';
import HomeHeader from './container/home/HomeHeader';

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomeHeader />} />
    </Routes>
  );
}

export default App;
