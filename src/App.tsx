import React,{useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Offers from './pages/user/Offers';
import Favorites from "./pages/user/Favorites";
import Register from "./pages/enterprise/Register";
import Login from "./pages/enterprise/Login";
import OfferDetails from './pages/user/OfferDetails';
import Menu from './pages/enterprise/Menu';
import Management from "./pages/enterprise/Management";
import EditOffer from "./pages/enterprise/EditOffer";
import CreateOffer from "./pages/enterprise/CreateOffer";
import {OfferInterface} from "./Interfaces/interface";
import {register} from './Interfaces/interface';
import data from './data.json';

function App() {

    const [theme, setTheme] = useState<boolean>(false);
    const [notification, setNotification] = useState<boolean>(false);
    const [offersData, setOffers] = useState<OfferInterface[]>();
    const [favorites, setFavorites] = useState<OfferInterface[]>([]);
    const [favoriteCount, setCount] = useState<number>();
    const [register, setRegister] = useState<register>({
        username: '',
        password: '',
        password_repeat: ''
    });
    const [auth, setAuth] = useState<{login: boolean}>({login: false});

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

    const handleNotificationModal = () => {
        setNotification(!notification);
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
    }, [])

  return (
      <BrowserRouter>
          <Routes>
              <Route index element={<Offers
                  offersData={offersData}
                  theme={theme}
                  handleThemeSwitch={handleThemeSwitch}
                  handleNotificationModal={handleNotificationModal}
                  notification={notification}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  favoriteCount={favoriteCount}
                  setOffers={setOffers} />}
              />
              <Route path="/offers/favorites" element={<Favorites
                  theme={theme}
                  handleThemeSwitch={handleThemeSwitch}
                  handleNotificationModal={handleNotificationModal}
                  notification={notification}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  offersData={offersData}
                  setOffers={setOffers} />}
              />
              <Route path="/offers/offer-details/:slug" element={<OfferDetails
                  offersData={offersData}
                  theme={theme}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  setOffers={setOffers}
                  handleThemeSwitch={handleThemeSwitch}
                  handleNotificationModal={handleNotificationModal}
                  notification={notification}
                  favoriteCount={favoriteCount} />}
              />
              <Route path="/enterprise/register" element={<Register
                  register={register}
                  setRegister={setRegister} />}
              />
              <Route path="/enterprise/login" element={<Login
                  setAuth={setAuth}
                  auth={auth} />}
              />
              <Route path="/enterprise/menu" element={<Menu
                  theme={theme}
                  auth={auth}
                  setAuth={setAuth}
                  handleThemeSwitch={handleThemeSwitch} />}
              />
              <Route path="/enterprise/management/:name" element={<Management
                  theme={theme}
                  auth={auth}
                  setAuth={setAuth}
                  handleThemeSwitch={handleThemeSwitch} />}
              />
              <Route path="/enterprise/edit/:title" element={<EditOffer
                  offersData={offersData}
                  theme={theme}
                  auth={auth}
                  setAuth={setAuth}
                  setOffers={setOffers}
                  handleThemeSwitch={handleThemeSwitch} />}
              />
              <Route path="/enterprise/create-offer" element={<CreateOffer
                  theme={theme}
                  auth={auth}
                  setAuth={setAuth}
                  setOffers={setOffers}
                  offersData={offersData}
                  handleThemeSwitch={handleThemeSwitch} />}
              />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
