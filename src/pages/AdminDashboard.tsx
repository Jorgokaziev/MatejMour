
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, DollarSign, Calendar } from 'lucide-react';
import { loadCustomers, loadReferrals, loadTransactions, loadBookings } from '@/utils/storage';
import { Customer, Referral, Transaction, Booking } from '@/types/models';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      setCustomers(loadCustomers());
      setReferrals(loadReferrals());
      setTransactions(loadTransactions());
      setBookings(loadBookings());
    }
  }, [currentUser]);

  const filteredCustomers = customers.filter(customer => 
    customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalRevenue = () => {
    return transactions
      .filter(t => t.status === 'completed')
      .reduce((total, transaction) => total + transaction.amount, 0);
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return <div>Unauthorized access</div>;
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
            <h1 className="text-2xl font-bold text-gray-800">Wellness Admin</h1>
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
          <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-600 mt-2">Manage your wellness affiliate program</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Customers</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{customers.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total registered</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Referrals</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{referrals.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total referrals</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Bookings</CardTitle>
              <Calendar className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{bookings.length}</p>
              <p className="text-sm text-gray-500 mt-1">Total bookings</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{calculateTotalRevenue()} CZK</p>
              <p className="text-sm text-gray-500 mt-1">Total revenue</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="customers">
            <TabsList className="mb-4">
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customers">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Management</CardTitle>
                  <CardDescription>Manage all customers in your affiliate program</CardDescription>
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Search customers..."
                      className="w-full p-2 border rounded"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Free Hours</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCustomers.map((customer) => (
                          <tr key={customer.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{customer.firstName} {customer.lastName}</div>
                              <div className="text-xs text-gray-500">{customer.role}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{customer.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{customer.freeHours}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${customer.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {customer.isVerified ? 'Verified' : 'Unverified'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <Button size="sm" variant="outline" className="mr-2">View</Button>
                              <Button size="sm" variant="outline" className="text-blue-600">Edit</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Management</CardTitle>
                  <CardDescription>View and manage all bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {bookings.map((booking) => (
                            <tr key={booking.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {new Date(booking.date).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {customers.find(c => c.id === booking.customerId)?.firstName || 'Unknown'} {customers.find(c => c.id === booking.customerId)?.lastName || ''}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">Service ID: {booking.serviceId}</div>
                                <div className="text-xs text-gray-500">{booking.duration} min</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{booking.price} CZK</div>
                                <div className="text-xs text-gray-500">{booking.paymentStatus}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Button size="sm" variant="outline" className="mr-2">View</Button>
                                <Button size="sm" variant="outline" className="text-blue-600">Update</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No bookings available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Reward Management</CardTitle>
                  <CardDescription>Manage rewards and referrals in your affiliate program</CardDescription>
                </CardHeader>
                <CardContent>
                  {referrals.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referred</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rewards</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {referrals.map((referral) => {
                            const referrer = customers.find(c => c.id === referral.referrerId);
                            const referred = customers.find(c => c.id === referral.referredId);
                            
                            return (
                              <tr key={referral.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {referrer ? `${referrer.firstName} ${referrer.lastName}` : 'Unknown'}
                                  </div>
                                  <div className="text-xs text-gray-500">{referrer?.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {referred ? `${referred.firstName} ${referred.lastName}` : 'Unknown'}
                                  </div>
                                  <div className="text-xs text-gray-500">{referred?.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">
                                    {new Date(referral.createdAt).toLocaleDateString()}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{referral.totalPaid} CZK</div>
                                  <div className="text-xs text-gray-500">{referral.transactions.length} transactions</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-green-600">{referral.totalFreeHours} hours</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <Button size="sm" variant="outline" className="mr-2">View</Button>
                                  <Button size="sm" variant="outline" className="text-blue-600">Add Reward</Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No referrals available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="py-6 mt-12 border-t bg-white">
        <div className="container text-center text-sm text-gray-500">
          <p>Wellness Affiliate Program Admin Panel</p>
          <p className="mt-1">© 2025 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
