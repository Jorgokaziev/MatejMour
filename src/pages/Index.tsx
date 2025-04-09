
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ParallaxHero from '@/components/ParallaxHero';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-wellness-soft-yellow">
      <ParallaxHero />
      
      <main>
        <section className="py-16 md:py-24 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-wellness-charcoal mb-6">
                Wellness služby s věrnostními odměnami
              </h2>
              <p className="text-xl text-wellness-earth mb-8">
                Připojte se k našemu exkluzivnímu věrnostnímu programu a získejte hodiny wellness služeb zdarma za doporučení přátel a rodiny.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-wellness-gold hover:bg-wellness-yellow text-wellness-charcoal"
                  onClick={() => navigate('/business')}
                >
                  Prohlédnout služby
                </Button>
                
                {/*
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-wellness-gold text-wellness-gold hover:bg-wellness-gold/20"
                  onClick={() => navigate('/register')}
                >
                  Zapojit se do programu
                </Button>                
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-wellness-gold/20">
              <h3 className="text-2xl font-semibold mb-4 text-wellness-charcoal">Jak to funguje</h3>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-wellness-yellow/30 flex items-center justify-center text-wellness-gold font-bold">1</div>
                  <div>
                    <h4 className="font-medium text-lg text-wellness-charcoal">Registrace</h4>
                    <p className="text-wellness-earth">Vytvořte si zdarma účet a získejte svůj osobní doporučující odkaz</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-wellness-yellow/30 flex items-center justify-center text-wellness-gold font-bold">2</div>
                  <div>
                    <h4 className="font-medium text-lg text-wellness-charcoal">Sdílejte s přáteli</h4>
                    <p className="text-wellness-earth">Sdílejte svůj unikátní odkaz s přáteli a rodinou</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-wellness-yellow/30 flex items-center justify-center text-wellness-gold font-bold">3</div>
                  <div>
                    <h4 className="font-medium text-lg text-wellness-charcoal">Získejte odměny</h4>
                    <p className="text-wellness-earth">Když si rezervují služby, automaticky získáváte hodiny zdarma</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        */}

        <section className="py-16 bg-wellness-charcoal/5">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12 text-wellness-charcoal">Naše prémiové služby</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-wellness-gold/10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wellness-yellow/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wellness-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-wellness-charcoal">Profesionální masáže</h3>
                <p className="text-wellness-earth">Relaxujte s našimi odbornými terapeutickými masážními službami.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-wellness-gold/10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wellness-yellow/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wellness-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                {/*
                <h3 className="text-xl font-semibold mb-2 text-wellness-charcoal">Sauna & Pára</h3>
                <p className="text-wellness-earth">Detoxikujte a omlazujte v našich prémiových saunových zařízeních.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-wellness-gold/10">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wellness-yellow/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-wellness-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-wellness-charcoal">Ošetření pleti</h3>
                <p className="text-wellness-earth">Revitalizujte svou pleť pomocí našich speciálních ošetření obličeje.</p>
              </div>
            </div>
            <Button 
              className="mt-10 bg-wellness-gold hover:bg-wellness-yellow text-wellness-charcoal" 
              onClick={() => navigate('/business')}
            > 

            */}
              Zobrazit všechny služby
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-10 bg-wellness-charcoal text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-wellness-gold">MM Masáže a Terapie</h3>
              {/*
              
              <p className="text-gray-300">
                Připojte se k našemu věrnostnímu programu a získejte odměny za sdílení wellness služeb s přáteli a rodinou.
              </p>

              */}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-wellness-gold">Kontakt</h3>
              <p className="text-gray-300">Třebeň 31, Třebeň</p>
              <p className="text-gray-300">+420 777 697 545</p>
              <p className="text-gray-300">ma.mour@seznam.cz</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-wellness-gold">Rychlé odkazy</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/business" className="hover:text-wellness-gold">Služby</a></li>
                <li><a href="/register" className="hover:text-wellness-gold">Věrnostní program</a></li>
                <li><a href="/login" className="hover:text-wellness-gold">Přihlášení člena</a></li>            
              </ul>
            </div>
          </div>
          <div className="border-t border-wellness-gold/20 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 MM Masáže a Terapie. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
