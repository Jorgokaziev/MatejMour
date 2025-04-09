
import React from 'react';
import Booking from '@/components/businessCard/Booking';
import { useToast } from '@/hooks/use-toast';

const BookingPage: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="text-2xl font-bold text-taskflow-gray">Wellness Centrum</h1>
          </div>
          <button
            onClick={() => toast({
              title: "About Our Booking System",
              description: "Book your wellness services easily and track your rewards."
            })}
            className="text-sm text-taskflow-orange hover:text-taskflow-sienna transition-colors"
          >
            Help
          </button>
        </div>
      </header>

      <main className="container py-8">
        <Booking />
      </main>

      <footer className="py-6 mt-12 border-t">
        <div className="container text-center text-sm text-taskflow-gray">
          <p>Wellness Affiliate Program</p>
          <p className="mt-1">Visit us at Main Street 123, Prague 1</p>
        </div>
      </footer>
    </div>
  );
};

export default BookingPage;
