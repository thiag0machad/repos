import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/repository/:repository' element={<Repository />} />
      </Routes>
    </BrowserRouter>
  );
}
