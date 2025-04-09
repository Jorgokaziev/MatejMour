
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Clock, Users, Calendar } from 'lucide-react';
import { loadReferrals, loadQRCodes, saveQRCodes } from '@/utils/storage';
import { QRCode, Referral } from '@/types/models';

const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const [qrCode, setQrCode] = useState<QRCode | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  useEffect(() => {
    if (currentUser) {
      // Load QR code
      const codes = loadQRCodes();
      const userQrCode = codes.find(code => code.customerId === currentUser.id);
      setQrCode(userQrCode || null);

      // Load referrals
      const allReferrals = loadReferrals();
      const userReferrals = allReferrals.filter(ref => ref.referrerId === currentUser.id);
      setReferrals(userReferrals);
    }
  }, [currentUser]);

  const generateQRCode = () => {
    if (!currentUser) return;
    
    setIsGeneratingQR(true);
    
    // Simulate QR code generation
    setTimeout(() => {
      const newQrCode: QRCode = {
        id: crypto.randomUUID(),
        customerId: currentUser.id,
        url: `https://example.com/ref/${currentUser.id}`,
        imageUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(`https://example.com/ref/${currentUser.id}`),
        createdAt: new Date().toISOString(),
        scansCount: 0
      };
      
      const codes = loadQRCodes();
      codes.push(newQrCode);
      saveQRCodes(codes);
      
      setQrCode(newQrCode);
      setIsGeneratingQR(false);
    }, 1500);
  };

  const copyReferralLink = () => {
    if (!qrCode) return;
    
    navigator.clipboard.writeText(qrCode.url).then(() => {
      alert("Referral link copied to clipboard!");
    });
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

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
            <h1 className="text-2xl font-bold text-gray-800">Wellness Affiliate</h1>
          </div>
          <div>
            <Button variant="ghost" onClick={() => window.location.href = "/"}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome, {currentUser.firstName}!</h2>
          <p className="text-gray-600 mt-2">Manage your affiliate program and track your rewards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Free Hours</CardTitle>
              <Clock className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{currentUser.freeHours} hours</p>
              <p className="text-sm text-gray-500 mt-1">Available to use</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Referrals</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{referrals.length}</p>
              <p className="text-sm text-gray-500 mt-1">People referred</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Next Booking</CardTitle>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-base font-medium">No upcoming bookings</p>
              <Button variant="link" className="p-0 h-auto mt-1">Book a service</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Link</CardTitle>
              <CardDescription>Share this link with friends to earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              {qrCode ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <img 
                      src={qrCode.imageUrl} 
                      alt="QR Code" 
                      className="w-48 h-48 border rounded" 
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={qrCode.url} 
                      readOnly 
                      className="flex-1 p-2 border rounded-md text-sm"
                    />
                    <Button onClick={copyReferralLink} size="sm">
                      <Share2 className="w-4 h-4 mr-1" /> Copy
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">
                    Scanned {qrCode.scansCount} times
                    {qrCode.lastScanned && ` (Last: ${new Date(qrCode.lastScanned).toLocaleDateString()})`}
                  </p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="mb-4">Generate your unique referral link and QR code</p>
                  <Button onClick={generateQRCode} disabled={isGeneratingQR}>
                    {isGeneratingQR ? 'Generating...' : 'Generate QR Code'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Referred Customers</CardTitle>
              <CardDescription>People who signed up using your referral link</CardDescription>
            </CardHeader>
            <CardContent>
              {referrals.length > 0 ? (
                <div className="space-y-4">
                  {referrals.map((referral) => (
                    <div key={referral.id} className="border-b pb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Referred User</p>
                          <p className="text-sm text-gray-500">
                            Joined on {new Date(referral.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{referral.totalPaid} CZK spent</p>
                          <p className="text-sm text-green-600">+{referral.totalFreeHours} free hours earned</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't referred anyone yet</p>
                  <p className="text-sm">Share your referral link to start earning rewards!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mb-3 bg-blue-100 text-blue-800 w-10 h-10 rounded-full flex items-center justify-center mx-auto">1</div>
                <h3 className="font-medium mb-2">Share Your Link</h3>
                <p className="text-sm text-gray-600">Share your unique referral link with friends and family</p>
              </div>
              <div className="text-center">
                <div className="mb-3 bg-blue-100 text-blue-800 w-10 h-10 rounded-full flex items-center justify-center mx-auto">2</div>
                <h3 className="font-medium mb-2">They Book Services</h3>
                <p className="text-sm text-gray-600">When they book and pay for our wellness services</p>
              </div>
              <div className="text-center">
                <div className="mb-3 bg-blue-100 text-blue-800 w-10 h-10 rounded-full flex items-center justify-center mx-auto">3</div>
                <h3 className="font-medium mb-2">You Earn Rewards</h3>
                <p className="text-sm text-gray-600">Get 5% of their payment as free service hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
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

export default CustomerDashboard;
