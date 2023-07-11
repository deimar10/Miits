import React,{useState, useEffect, lazy, Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {OfferInterface, register} from "./Interfaces";
import {handleOfferStatus, lazyLoaderFallbackStyle} from './utils';
import {getAllOffers} from './middleware/api';

const Offers = lazy(() => import('./pages/user/Offers'));
const Favorites = lazy(() => import('./pages/user/Favorites'));
const Register = lazy(() => import('./pages/enterprise/Register'));
const Login = lazy(() => import('./pages/enterprise/Login'));
const OfferDetails = lazy(() => import('./pages/user/OfferDetails'));
const Menu = lazy(() => import('./pages/enterprise/Menu'));
const Management = lazy(() => import('./pages/enterprise/Management'));
const EditOffer = lazy(() => import('./pages/enterprise/EditOffer'));
const CreateOffer = lazy(() => import('./pages/enterprise/CreateOffer'));
const Panel = lazy(() => import('./pages/admin/Panel'));

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
    const [admin, setAdmin] = useState<boolean>(false);

    useEffect(() => {
        setCount(favorites.length);
    }, [favorites.length])

    useEffect(() => {
        if (localStorage.getItem('favorites') === null) {
            localStorage.setItem('favorites', JSON.stringify([]));
        }
    }, []);

    const handlePersistedThemeSetting = () => {
        const persistTheme = localStorage.getItem('theme');

        if (persistTheme) {
            switch (JSON.parse(persistTheme)) {
                case 'theme-true': {
                    setTheme(true);
                    return;
                }
                case 'theme-false': {
                    setTheme(false);
                    return;
                }
            }
        }
    }

    const handleThemeSwitch = () => {
        setTheme(!theme);

        localStorage.setItem('theme', JSON.stringify(`theme-${!theme}`));
    }

    const handleNotificationModal = () => {
        setNotification(!notification);
    }

    const handleGetAllOffers = async () => {
        try {
            let localFavorites = JSON.parse(localStorage.getItem('favorites') || "");

            const offers = await getAllOffers();

            const updatedOffers = handleOfferStatus(offers).map((object: OfferInterface) => {
                if (localFavorites.find((favorite: OfferInterface) => favorite.id === object.id) !== undefined) {
                    return {...object, favorite: true};
                } else {
                    return object;
                }
            });

            setOffers(updatedOffers);
        } catch (error) {
            console.log('Error requesting offers:', error);
            throw error;
        }
    }

    useEffect(() => {
        handlePersistedThemeSetting();

        handleGetAllOffers();
    }, []);

  return (
      <BrowserRouter>
          <Suspense
              fallback={
                    <Box sx={lazyLoaderFallbackStyle}>
                        <CircularProgress
                            size={60}
                        />
                    </Box>
                }
          >
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
                      auth={auth}
                      admin={admin}
                      setAdmin={setAdmin} />}
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
                      handleThemeSwitch={handleThemeSwitch} />}
                  />
                  <Route path="/enterprise/create-offer" element={<CreateOffer
                      theme={theme}
                      auth={auth}
                      setAuth={setAuth}
                      handleThemeSwitch={handleThemeSwitch} />}
                  />
                  <Route path="/admin" element={<Panel
                      admin={admin} />}
                  />
              </Routes>
          </Suspense>
      </BrowserRouter>
  );
}

export default App;
