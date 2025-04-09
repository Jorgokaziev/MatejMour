
import React from 'react';
import { useParams } from 'react-router-dom';
import BusinessInfo from '@/components/businessCard/BusinessInfo';

const BusinessCardPage = () => {
  // Get referrer ID from URL if available
  const { referrerId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="py-6 border-b bg-white">
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
              className="w-6 h-6 text-blue-500"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800">Wellness Centrum</h1>
          </div>
          {referrerId && (
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded">
              You've been referred by a member!
            </div>
          )}
        </div>
      </header>

      <main className="container py-8">
        <BusinessInfo />
      </main>

      <footer className="py-6 mt-12 border-t bg-white">
        <div className="container text-center text-sm text-gray-500">
          <p>Wellness Affiliate Program</p>
          <p className="mt-1">Visit us at Main Street 123, Prague 1</p>
        </div>
      </footer>
    </div>
  );
};

export default BusinessCardPage;
