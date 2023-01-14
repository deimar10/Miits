import React,{useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Offers from './pages/user/Offers';
import {OfferInterface} from "./Interfaces/interface";
import data from './data.json';

function App() {

    const[offersData, setOffers] = useState<OfferInterface[]>();

    useEffect(() => {
        setOffers(data);
    }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Offers offersData={offersData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
