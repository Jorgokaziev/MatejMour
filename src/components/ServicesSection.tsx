import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Ikony pro služby
const MassageIcon = () => (
  <div className="text-yellow-400 w-8 h-8 mb-4 mx-auto">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-4v-2h2v2h-2zm.5-4.5v.5h-1v-.5a3.5 3.5 0 1 1 3.5-3.5h-1a2.5 2.5 0 1 0-2.5 2.5v1z" />
    </svg>
  </div>
);

const CranialIcon = () => (
  <div className="text-yellow-400 w-8 h-8 mb-4 mx-auto">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6zm-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21z M12 17a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.76-2.24 5-5 5zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
  </div>
);

const EmotionalIcon = () => (
  <div className="text-yellow-400 w-8 h-8 mb-4 mx-auto">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3-7h6a3 3 0 0 1-6 0zm-2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
    </svg>
  </div>
);

const ServiceCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
      {icon}
      <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Masérské a terapeutické služby</h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Zažijte masáž trochu jinak - třeba v přírodě, u řeky nebo v lese. Všechno
          je možné, tak to pojďme vyzkoušet. Pokud vás ale dobrodružství neláká,
          rád vás namasíruji v pohodlí vašeho domova. A pokud ani to není ono,
          žádný stres - parkování je hned vedle budovy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <ServiceCard 
            title="Masáže" 
            description="Klasická zdravotní masáž pomáhá uvolnit napětí ve svalech, zlepšuje prokrvení a podporuje regeneraci těla."
            icon={<MassageIcon />}
          />
          
          <ServiceCard 
            title="Kraniosakrální terapie" 
            description="Jemná ale účinná metoda, která podporuje tělo i duši."
            icon={<CranialIcon />}
          />
          
          <ServiceCard 
            title="Somatoemocionální uvolnění" 
            description="Jemná technika, která pomáhá uvolnit emoce uložené v těle."
            icon={<EmotionalIcon />}
          />
        </div>
        
        <div className="text-center">
          <Button 
            onClick={() => navigate('/sluzby')} 
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-2 rounded-lg"
          >
            Zobrazit všechny služby
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;