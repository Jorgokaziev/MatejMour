
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  return (
    <header className="py-4 bg-wellness-soft-yellow/90 backdrop-blur-sm border-b border-wellness-gold/30 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10">
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full text-wellness-gold"
              fill="currentColor"
            >
              <path d="M50,10 C60,25 80,25 90,40 C80,55 60,55 50,70 C40,55 20,55 10,40 C20,25 40,25 50,10 Z" />
              <path d="M50,20 C57,30 70,30 78,40 C70,50 57,50 50,60 C43,50 30,50 22,40 C30,30 43,30 50,20 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="40" r="5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-wellness-charcoal">MM Masáže</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/business')}
            className="text-wellness-charcoal hover:text-wellness-sienna transition-colors"
          >
            Služby
          </button>

          {/*
          
          <button
            onClick={() => navigate('/booking')}
            className="text-wellness-charcoal hover:text-wellness-sienna transition-colors"
          >
            Rezervace
          </button>

*/}
          
          <button
            onClick={() => toast({
              title: "O našem centru",
              description: "Wellness centrum s kompletním programem masáží, terapií a odměn pro stálé klienty."
            })}
            className="ml-4 text-sm text-wellness-sienna hover:text-wellness-orange transition-colors"
          >
            O nás
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
