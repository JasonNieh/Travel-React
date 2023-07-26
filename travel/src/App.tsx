import React, { useEffect } from 'react';
import styles from './App.module.css';
import { HomePage, RegisterPage, DetailPage, SignInPage, SearchPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useAppDispatch } from "./redux/hooks";
import { Navigate } from 'react-router-dom';
import { ShoppingCart } from './pages';
import { getShoppingCart } from './redux/shoppingCart/slice';


const PrivateRoute = ({ children }) => {
  const jwt = useSelector((s) => s.user.token);
  return jwt ? children : <Navigate to="/signIn" />;
};

function App() {
  const jwt = useSelector((s) => s.user.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search/">
            <Route path=":keywords" element={<SearchPage />} />
            <Route path="" element={<SearchPage />} />
          </Route>
          <Route path="/shoppingCart" element={
            <PrivateRoute>
              <ShoppingCart />
            </PrivateRoute>
          }
          />
          <Route path="*" element={<h1>404 not found... what you are looking for doesn't exist</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
