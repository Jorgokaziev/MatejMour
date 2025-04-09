
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer } from '../types/models';
import { loadCurrentUser, saveCurrentUser, clearCurrentUser, loadCustomers, saveCustomers } from '../utils/storage';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  currentUser: Customer | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<Customer>, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load current user on mount
  useEffect(() => {
    const user = loadCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // For demo purposes, we're simulating authentication
  // In a real app, this would be handled by a server
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const customers = loadCustomers();
      const user = customers.find(c => c.email.toLowerCase() === email.toLowerCase());
      
      if (!user) {
        toast({
          title: "Login Failed",
          description: "User not found. Please check your email.",
          variant: "destructive",
        });
        return false;
      }
      
      // In a real app, we would check the password hash
      // For demo, we're just simulating successful login
      setCurrentUser(user);
      saveCurrentUser(user);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.firstName}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login.",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (userData: Partial<Customer>, password: string): Promise<boolean> => {
    try {
      const customers = loadCustomers();
      
      // Check if email already exists
      if (customers.some(c => c.email.toLowerCase() === userData.email?.toLowerCase())) {
        toast({
          title: "Registration Failed",
          description: "Email already in use. Please try another one.",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user
      const newUser: Customer = {
        id: crypto.randomUUID(),
        email: userData.email || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        description: userData.description || '',
        age: userData.age,
        occupation: userData.occupation || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isVerified: false, // Requires verification
        freeHours: 0,
        role: 'customer',
        referrerId: userData.referrerId || null,
      };
      
      // Save to storage
      customers.push(newUser);
      saveCustomers(customers);
      
      // Auto-login the user
      setCurrentUser(newUser);
      saveCurrentUser(newUser);
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    clearCurrentUser();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateProfile = async (data: Partial<Customer>): Promise<boolean> => {
    try {
      if (!currentUser) return false;
      
      const customers = loadCustomers();
      const updatedUser = { 
        ...currentUser, 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      
      // Update in customers list
      const updatedCustomers = customers.map(c => 
        c.id === currentUser.id ? updatedUser : c
      );
      
      saveCustomers(updatedCustomers);
      
      // Update current user
      setCurrentUser(updatedUser);
      saveCurrentUser(updatedUser);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully!",
      });
      
      return true;
    } catch (error) {
      console.error("Update profile error:", error);
      toast({
        title: "Update Failed",
        description: "An error occurred while updating your profile.",
        variant: "destructive",
      });
      return false;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
