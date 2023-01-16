import React,{useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Offers from './pages/user/Offers';
import {OfferInterface} from "./Interfaces/interface";
import data from './data.json';

function App() {

    const [theme, setTheme] = useState<boolean>(false);
    const [offersData, setOffers] = useState<OfferInterface[]>();

    const handleThemeSwitch = () => {
        setTheme(!theme);
    }

    useEffect(() => {
        setOffers([]);
    }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Offers offersData={offersData} theme={theme} handleThemeSwitch={handleThemeSwitch} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
