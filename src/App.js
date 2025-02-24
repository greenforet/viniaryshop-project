import { Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from "./pages/Home";
import AboutUsPage from './pages/AboutUsPage';
import WinePage from './pages/WinePage';
import ShopPage from './pages/ShopPage';
import TipsPage from './pages/TipsPage';
import WineInfoPage from './pages/WineInfoPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="aboutuspage" element={<AboutUsPage/>} />
        <Route path="winepage" element={<WinePage/>} />
        <Route path="/wineinfopage/:itemId" element={<WineInfoPage/>} />
        <Route path="shoppage" element={<ShopPage/>} />
        <Route path="tipspage" element={<TipsPage/>} />
      </Routes>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #F2F0EA;
  }

  #root {
    height: 100%;
  }
`;