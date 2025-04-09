
import React from 'react';
import { useParams } from 'react-router-dom';
import BusinessInfo from '@/components/businessCard/BusinessInfo';
import Header from '@/components/Header';

const BusinessCardPage = () => {
  // Get referrer ID from URL if available
  const { referrerId } = useParams();

  return (
    <div className="min-h-screen bg-wellness-soft-yellow">
      <Header />

      {referrerId && (
        <div className="bg-wellness-gold/20 border-b border-wellness-gold/30">
          <div className="container py-3 text-center text-wellness-charcoal">
            <span className="font-medium">Byli jste doporučeni členem našeho programu!</span>
          </div>
        </div>
      )}

      <main className="container py-8">
        <BusinessInfo />
      </main>

      <footer className="py-6 mt-12 border-t border-wellness-gold/30 bg-wellness-charcoal/5">
        <div className="container text-center text-sm text-wellness-charcoal">
          <p>MM Masáže a Terapie - Věrnostní program</p>
          <p className="mt-1">Navštivte nás na adrese Hlavní 123, Praha 1</p>
        </div>
      </footer>
    </div>
  );
};

export default BusinessCardPage;
