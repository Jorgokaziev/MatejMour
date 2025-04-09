
import React from 'react';
import { useToast } from '@/hooks/use-toast';

const Header: React.FC = () => {
  const { toast } = useToast();
  
  return (
    <header className="py-6 border-b border-taskflow-yellow">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-6 h-6 text-taskflow-orange"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
          <h1 className="text-2xl font-bold text-taskflow-gray">Wellness Center</h1>
        </div>
        <button
          onClick={() => toast({
            title: "About Our Platform",
            description: "A complete wellness management system with affiliate program, booking, and rewards tracking."
          })}
          className="text-sm text-taskflow-orange hover:text-taskflow-sienna transition-colors"
        >
          About
        </button>
      </div>
    </header>
  );
};

export default Header;
