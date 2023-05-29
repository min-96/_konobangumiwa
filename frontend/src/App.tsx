import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Template/Home';
import User from './components/Template/User';
import './index.css';
import Detail from './components/Template/Detail';
import { UserProvider } from './hook/UserContext';
import { ErrorProvider } from './hook/ErrorContext';
import ErrorSnackbar from './components/Organism/ErrorSnackbar';
import Finder from './components/Template/Finder';



function App() {
  return (
    <ErrorProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/contents/:contentId" element={<Detail />} />
              <Route path="/finder" element={<Finder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
      <ErrorSnackbar />
    </ErrorProvider>
  );
}

export default App;