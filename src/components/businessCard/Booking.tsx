
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { loadBusinessInfo } from '@/utils/storage';
import { BusinessInfo, Service } from '@/types/models';
import { useToast } from '@/hooks/use-toast';

const Booking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { serviceId } = location.state || {};
  
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const info = loadBusinessInfo();
    if (info) {
      setBusinessInfo(info);
      if (serviceId) {
        const service = info.services.find((s: Service) => s.id === serviceId);
        if (service) {
          setSelectedService(service);
        }
      }
    }
  }, [serviceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !selectedDate || !name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    // In a real application, this would submit to a database
    toast({
      title: "Booking Confirmed!",
      description: `Your ${selectedService.name} is booked for ${selectedDate.toLocaleDateString()}`,
    });
    
    // Redirect to home or confirmation page
    navigate('/');
  };

  if (!businessInfo) {
    return <div className="text-center py-8">Loading business information...</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Card className="border-taskflow-yellow">
        <CardHeader className="bg-taskflow-orange/10">
          <CardTitle className="text-taskflow-gray">Book Your Appointment</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <select 
                id="service"
                value={selectedService?.id || ''}
                onChange={(e) => {
                  const service = businessInfo.services.find(s => s.id === e.target.value);
                  setSelectedService(service || null);
                }}
                className="w-full p-2 border border-taskflow-yellow rounded-md"
                required
              >
                <option value="">Select a service</option>
                {businessInfo.services.map((service: Service) => (
                  <option key={service.id} value={service.id}>
                    {service.name} - {service.price} CZK ({service.duration} min)
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Select Date</Label>
              <div className="border border-taskflow-yellow rounded-md p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md"
                  disabled={{ before: new Date() }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="border-taskflow-yellow"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-taskflow-yellow"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="border-taskflow-yellow"
                required
              />
            </div>
            
            <div className="pt-4 flex gap-4">
              <Button 
                type="submit" 
                className="bg-taskflow-orange hover:bg-taskflow-sienna text-white"
              >
                Confirm Booking
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="border-taskflow-yellow text-taskflow-gray hover:bg-taskflow-yellow/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Booking;
