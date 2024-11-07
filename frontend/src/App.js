import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import Home from './pages/Home';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import './assets/css/styles.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PortfolioProvider>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Toaster />
        </PortfolioProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;


