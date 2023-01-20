import React,{useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Offers from './pages/user/Offers';
import Favorites from "./pages/user/Favorites";
import OfferDetails from './pages/user/OfferDetails';
import {OfferInterface} from "./Interfaces/interface";
import data from './data.json';

function App() {

    const [theme, setTheme] = useState<boolean>(false);
    const [offersData, setOffers] = useState<OfferInterface[]>();
    const [favorites, setFavorites] = useState<OfferInterface[]>([]);
    const [favoriteCount, setCount] = useState<number>();

    useEffect(() => {
        setCount(favorites.length);
    }, [favorites.length])

    useEffect(() => {
        if (localStorage.getItem('favorites') === null) {
            localStorage.setItem('favorites', JSON.stringify([]));
        }
    }, [])

    const handleThemeSwitch = () => {
        setTheme(!theme);
    }

    useEffect(() => {
        let localFavorites = JSON.parse(localStorage.getItem('favorites') || "");
        const date = new Date().getTime();

        data.map((object: OfferInterface) => {
            if (date < new Date(object.date).getTime()) {
                return object.upcoming = true;
            } else {
                return object.upcoming = false;
            }
        })

        data.map((object: OfferInterface) => {
            if (localFavorites.find((favorite: OfferInterface) => favorite.id === object.id) !== undefined) {
                return object.favorite = true;
            }
        })

        setOffers(data);
    }, [offersData])

  return (
      <BrowserRouter>
          <Routes>
              <Route index element={<Offers
                  offersData={offersData}
                  theme={theme}
                  handleThemeSwitch={handleThemeSwitch}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  favoriteCount={favoriteCount}
                  setOffers={setOffers} />}
              />
              <Route path="/offers/favorites" element={<Favorites
                  theme={theme}
                  handleThemeSwitch={handleThemeSwitch}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  offersData={offersData}
                  setOffers={setOffers} />}
              />
              <Route path="/offers/offer-details/:slug" element={<OfferDetails
                  offersData={offersData} />}
              />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
