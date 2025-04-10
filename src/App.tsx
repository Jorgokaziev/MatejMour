import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './App.css';

// Implementace jednoduchého footer komponenty přímo zde
const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="text-center">
        <p className="text-sm text-gray-400">
          MM Masáže a Terapie - Přej vám krásný den
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Třeboň 11, Třeboň
        </p>
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} Matej Mour. Všechna práva vyhrazena.
        </p>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;