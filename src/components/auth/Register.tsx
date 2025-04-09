
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    age: '',
    occupation: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get referrer ID from URL if available
  const queryParams = new URLSearchParams(location.search);
  const referrerId = queryParams.get('ref');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(
        {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age ? parseInt(formData.age) : undefined,
          occupation: formData.occupation,
          description: formData.description,
          referrerId: referrerId || undefined,
        },
        formData.password
      );
      
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            {referrerId 
              ? "You've been referred! Fill out this form to sign up." 
              : "Fill out the form below to create your account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age (Optional)</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Your Age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation (Optional)</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  placeholder="Your Occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">About You (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Tell us about yourself..."
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            {referrerId && (
              <div className="p-3 bg-blue-50 text-blue-700 rounded-md">
                You're being referred by someone. You'll both earn benefits!
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
            <p className="text-sm text-center text-gray-500 mt-4">
              Already have an account?{" "}
              <a 
                href="/login" 
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                Log in
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
