import React from 'react';
import styles from './App.module.css';
import { HomePage, RegisterPage, DetailPage, SignInPage, SearchPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


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
          <Route path="*" element={<h1>404 not found... what you are looking for doesn't exist</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
