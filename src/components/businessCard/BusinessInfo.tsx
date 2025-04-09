
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BusinessInfo as BusinessInfoType, Service, WorkingHour } from '@/types/models';
import { loadBusinessInfo } from '@/utils/storage';
import { useNavigate } from 'react-router-dom';

const BusinessInfo: React.FC = () => {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfoType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load business info or create a default one for demo purposes
    const info = loadBusinessInfo();
    if (info) {
      setBusinessInfo(info);
    } else {
      // Create sample data for demo
      const sampleBusinessInfo: BusinessInfoType = {
        id: "1",
        name: "M.M Masáže a terapie",
        description: "Místo pro váš odpočinek",
        services: [
          { id: "1", name: "Zdravotní masáž", price: 777/555, duration: 60/30 },
          { id: "2", name: "Masáž břicha", price: 300, duration: 20 },
          { id: "3", name: "Kraniosakrální terapie/biodynamika", price: 888/999, duration: 45-60 },
          { id: "4", name: "Somatoemocionalní uvolnění", price: 777, duration: 40 }
        ],
        contact: {
          phone: "+420 777 697 545",
          email: "ma.mour@seznam.cz",
          address: "Třebeň 31, Třebeň"
        },
        workingHours: [
          { day: "Pondělí", from: "9:00", to: "20:00" },
          { day: "Úterý", from: "9:00", to: "20:00" },
          { day: "Středa", from: "9:00", to: "20:00" },
          { day: "Čtvrtek", from: "9:00", to: "20:00" },
          { day: "Pátek", from: "9:00", to: "21:00" },
          { day: "Sobota", from: "10:00", to: "18:00" },
          {/* day: "Sunday", from: "10:00", to: "15:00" */}
        ]
      };
      
      setBusinessInfo(sampleBusinessInfo);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading business information...</div>;
  }

  if (!businessInfo) {
    return <div className="text-center text-red-500">Business information not available</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-taskflow-gray">{businessInfo.name}</h1>
        <p className="mt-2 text-gray-600">{businessInfo.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="border-taskflow-yellow">
          <CardHeader className="bg-taskflow-orange/10">
            <CardTitle>Our Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {businessInfo.services.map((service: Service) => (
                <div key={service.id} className="flex justify-between items-center border-b pb-2 border-taskflow-yellow/30">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.duration} minutes</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{service.price} CZK</p>
                    <Button 
                      size="sm" 
                      className="bg-taskflow-orange hover:bg-taskflow-sienna text-white"
                      onClick={() => navigate('/booking', { state: { serviceId: service.id } })}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-taskflow-yellow">
            <CardHeader className="bg-taskflow-orange/10">
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Address:</strong> {businessInfo.contact.address}</p>
                <p><strong>Phone:</strong> {businessInfo.contact.phone}</p>
                <p><strong>Email:</strong> {businessInfo.contact.email}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-taskflow-yellow">
            <CardHeader className="bg-taskflow-orange/10">
              <CardTitle>Working Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {businessInfo.workingHours.map((hours: WorkingHour, index) => (
                  <div key={index} className="grid grid-cols-2">
                    <span className="font-medium">{hours.day}</span>
                    <span>{hours.from} - {hours.to}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-4 text-taskflow-gray">Join Our Affiliate Program</h2>
        <p className="mb-4">Refer friends and earn free hours of wellness services!</p>
        <div className="space-x-4">
          <Button 
            className="bg-taskflow-orange hover:bg-taskflow-sienna text-white"
            onClick={() => navigate('/register')}
          >
            Join Now
          </Button>
          <Button 
            variant="outline" 
            className="border-taskflow-yellow text-taskflow-gray hover:bg-taskflow-yellow/10"
            onClick={() => navigate('/login')}
          >
            Already a Member? Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;
