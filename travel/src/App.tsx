import React from 'react';
import styles from './App.module.css';
import { HomePage, RegisterPage, DetailPage, SignInPage, SearchPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from "./redux/hooks";
import { Navigate } from 'react-router-dom';
import { ShoppingCart } from './pages';
const PrivateRoute = ({ children }) => {
  const jwt = useSelector(s => s.user.token);
  return jwt ? children : <Navigate to="/signin/" />
}

function App() {
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
          <Route path="shoppingCart" element={
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
