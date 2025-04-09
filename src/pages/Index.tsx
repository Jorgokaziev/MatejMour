
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
          <div className="flex gap-4">
            {currentUser ? (
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="py-16 md:py-24 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Wellness Services with Rewards
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our exclusive affiliate program and earn free hours of wellness services by referring friends and family.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" onClick={() => navigate('/business')}>
                  View Services
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/register')}>
                  Join Affiliate Program
                </Button>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
                  <div>
                    <h4 className="font-medium text-lg">Sign Up</h4>
                    <p className="text-gray-600">Create your free account and get your personal referral link</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
                  <div>
                    <h4 className="font-medium text-lg">Share With Friends</h4>
                    <p className="text-gray-600">Share your unique referral link with friends and family</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">3</div>
                  <div>
                    <h4 className="font-medium text-lg">Earn Rewards</h4>
                    <p className="text-gray-600">When they book services, you earn free hours automatically</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-12">Our Premium Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Professional Massage</h3>
                <p className="text-gray-600">Relax with our expert therapeutic massage services.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sauna & Steam</h3>
                <p className="text-gray-600">Detox and rejuvenate in our premium sauna facilities.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Facial Treatments</h3>
                <p className="text-gray-600">Revitalize your skin with our specialized facial treatments.</p>
              </div>
            </div>
            <Button className="mt-10" onClick={() => navigate('/business')}>
              View All Services
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-10 bg-gray-800 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Wellness Affiliate</h3>
              <p className="text-gray-300">
                Join our affiliate program and earn while sharing wellness with friends and family.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">Main Street 123, Prague 1</p>
              <p className="text-gray-300">+420 123 456 789</p>
              <p className="text-gray-300">info@wellness-harmonie.cz</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/business" className="hover:underline">Services</a></li>
                <li><a href="/register" className="hover:underline">Join Program</a></li>
                <li><a href="/login" className="hover:underline">Member Login</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Wellness Affiliate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
