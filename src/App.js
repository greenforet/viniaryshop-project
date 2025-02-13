import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AboutUsPage from './pages/AboutUsPage';
import WinePage from './pages/WinePage';
import ShopPage from './pages/ShopPage';
import TipsPage from './pages/TipsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="aboutpage" element={<AboutUsPage/>} />
      <Route path="winepage" element={<WinePage/>} />
      <Route path="shoppage" element={<ShopPage/>} />
      <Route path="tipspage" element={<TipsPage/>} />
    </Routes>
  );
}

export default App;
