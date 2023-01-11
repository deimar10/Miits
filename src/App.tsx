import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Offers from './pages/user/Offers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Offers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
