
import React from 'react';
import Booking from '@/components/businessCard/Booking';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const BookingPage: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="min-h-screen bg-wellness-soft-yellow">
      <Header />

      <div className="bg-wellness-gold/10 border-b border-wellness-gold/20">
        <div className="container py-4">
          <h1 className="text-2xl font-bold text-wellness-charcoal">Rezervace služeb</h1>
          <p className="text-wellness-earth mt-1">Vyberte si z našich wellness služeb a rezervujte si termín</p>
        </div>
      </div>

      <main className="container py-8">
        <Booking />
      </main>

      <footer className="py-6 mt-12 border-t border-wellness-gold/30 bg-wellness-charcoal/5">
        <div className="container text-center text-sm text-wellness-charcoal">
          <p>MM Masáže a Terapie - Věrnostní program</p>
          <p className="mt-1">Navštivte nás na adrese Hlavní 123, Praha 1</p>
          <button
            onClick={() => toast({
              title: "Potřebujete pomoc?",
              description: "V případě jakýchkoli dotazů ohledně rezervace nás kontaktujte na tel. čísle +420 123 456 789."
            })}
            className="mt-2 text-wellness-sienna hover:text-wellness-orange underline transition-colors text-sm"
          >
            Nápověda s rezervací
          </button>
        </div>
      </footer>
    </div>
  );
};

export default BookingPage;
