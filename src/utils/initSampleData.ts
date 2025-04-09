
import { 
  Customer, 
  BusinessInfo, 
  Booking, 
  QRCode, 
  Referral, 
  Transaction, 
  Notification, 
  AdminAction 
} from '../types/models';
import { 
  loadCustomers, 
  saveCustomers,
  loadBusinessInfo,
  saveBusinessInfo,
  loadBookings,
  saveBookings,
  loadQRCodes,
  saveQRCodes,
  loadReferrals,
  saveReferrals,
  loadTransactions,
  saveTransactions
} from './storage';

// Initialize sample data for demo purposes
export const initSampleData = () => {
  // Check if data already exists
  const existingCustomers = loadCustomers();
  if (existingCustomers.length > 0) {
    return; // Data already initialized
  }
  
  console.log('Initializing sample data...');
  
  // Create sample customers
  const adminId = crypto.randomUUID();
  const customer1Id = crypto.randomUUID();
  const customer2Id = crypto.randomUUID();
  const customer3Id = crypto.randomUUID();
  
  const customers: Customer[] = [
    {
      id: adminId,
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      description: 'Wellness center administrator',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isVerified: true,
      freeHours: 0,
      role: 'admin'
    },
    {
      id: customer1Id,
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      description: 'Regular wellness enthusiast',
      age: 35,
      occupation: 'Software Developer',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isVerified: true,
      qrCodeUrl: `https://example.com/ref/${customer1Id}`,
      freeHours: 2.5,
      role: 'customer'
    },
    {
      id: customer2Id,
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      description: 'Loves massages and facials',
      age: 28,
      occupation: 'Marketing Manager',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      isVerified: true,
      qrCodeUrl: `https://example.com/ref/${customer2Id}`,
      freeHours: 1.5,
      referrerId: customer1Id,
      role: 'customer'
    },
    {
      id: customer3Id,
      email: 'mike@example.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      description: 'New to wellness treatments',
      age: 42,
      occupation: 'Architect',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      isVerified: true,
      qrCodeUrl: `https://example.com/ref/${customer3Id}`,
      freeHours: 0,
      referrerId: customer2Id,
      role: 'customer'
    }
  ];
  
  // Create business info
  const businessInfo: BusinessInfo = {
    id: "1",
    name: "M.M Masáže a terapie",
    description: "Místo pro váš odpočinek, ať už hledáte úlevu od bolesti, stresu nebo jen chvíli pro sebe.",
    services: [
      { id: "1", name: "Masáž celková/částečná", price: 777/555, duration: 60/30 },
      { id: "2", name: "Masáž břicha", price: 300, duration: 20 },
      { id: "3", name: "Kraniosakrální terapie/biodynamika", price: 888/999, duration: 45-60 },
      { id: "4", name: "Somatoemocionální uvolnění", price: 777, duration: 40 }
    ],
    contact: {
      Tel.: "+420 777 697 545",
      email: "ma.mour@seznam.cz",
      adresa: "Třebeň 31, Třebeň"
    },
    workingHours: [
      { day: "Pondělí", from: "9:00", to: "19:00" },
      { day: "Úterý", from: "9:00", to: "19:00" },
      { day: "Středa", from: "9:00", to: "19:00" },
      { day: "Čtvrtek", from: "9:00", to: "19:00" },
      { day: "Pátek", from: "9:00", to: "20:00" },
      { day: "Sobota", from: "10:00", to: "15:00" },
      {/* day: "Sunday", from: "10:00", to: "15:00" */}
    ]
  };
  
  // Create QR codes
  const qrCodes: QRCode[] = [
    {
      id: crypto.randomUUID(),
      customerId: customer1Id,
      url: `https://example.com/ref/${customer1Id}`,
      imageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/ref/${customer1Id}`,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      scansCount: 3,
      lastScanned: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
    },
    {
      id: crypto.randomUUID(),
      customerId: customer2Id,
      url: `https://example.com/ref/${customer2Id}`,
      imageUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/ref/${customer2Id}`,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      scansCount: 1,
      lastScanned: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    }
  ];
  
  // Create bookings
  const booking1Id = crypto.randomUUID();
  const booking2Id = crypto.randomUUID();
  const booking3Id = crypto.randomUUID();
  
  const bookings: Booking[] = [
    {
      id: booking1Id,
      customerId: customer2Id,
      serviceId: "1", // Massage
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
      duration: 60,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      price: 500,
      referrerId: customer1Id
    },
    {
      id: booking2Id,
      customerId: customer2Id,
      serviceId: "3", // Facial Treatment
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      duration: 45,
      status: 'confirmed',
      paymentStatus: 'paid',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      price: 600,
      referrerId: customer1Id
    },
    {
      id: booking3Id,
      customerId: customer3Id,
      serviceId: "2", // Sauna
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days in future
      duration: 90,
      status: 'pending',
      paymentStatus: 'unpaid',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      price: 300,
      referrerId: customer2Id
    }
  ];
  
  // Create transactions
  const transactions: Transaction[] = [
    {
      id: crypto.randomUUID(),
      customerId: customer2Id,
      bookingId: booking1Id,
      amount: 500,
      currency: 'CZK',
      status: 'completed',
      paymentMethod: 'card',
      stripePaymentId: 'pi_mock_1',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      referrerId: customer1Id,
      rewardAmount: 25, // 5% of amount
      rewardHours: 0.5 // Converted to hours
    },
    {
      id: crypto.randomUUID(),
      customerId: customer2Id,
      bookingId: booking2Id,
      amount: 600,
      currency: 'CZK',
      status: 'completed',
      paymentMethod: 'card',
      stripePaymentId: 'pi_mock_2',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      referrerId: customer1Id,
      rewardAmount: 30, // 5% of amount
      rewardHours: 0.6 // Converted to hours
    }
  ];
  
  // Create referrals
  const referrals: Referral[] = [
    {
      id: crypto.randomUUID(),
      referrerId: customer1Id,
      referredId: customer2Id,
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      totalPaid: 1100, // 500 + 600
      totalFreeHours: 1.1, // 0.5 + 0.6
      transactions: [
        {
          bookingId: booking1Id,
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 500,
          freeHoursEarned: 0.5
        },
        {
          bookingId: booking2Id,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          amount: 600,
          freeHoursEarned: 0.6
        }
      ]
    },
    {
      id: crypto.randomUUID(),
      referrerId: customer2Id,
      referredId: customer3Id,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      totalPaid: 0, // No transactions yet
      totalFreeHours: 0,
      transactions: []
    }
  ];
  
  // Save sample data to localStorage
  saveCustomers(customers);
  saveBusinessInfo(businessInfo);
  saveQRCodes(qrCodes);
  saveBookings(bookings);
  saveTransactions(transactions);
  saveReferrals(referrals);
  
  console.log('Sample data initialized successfully');
};
