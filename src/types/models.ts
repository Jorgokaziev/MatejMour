
export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  description?: string;
  age?: number;
  occupation?: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  qrCodeUrl?: string;
  freeHours: number;
  referrerId?: string | null;
  role: 'customer' | 'admin';
}

export interface BusinessInfo {
  id: string;
  name: string;
  description: string;
  services: Service[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  workingHours: WorkingHour[];
  logo?: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface WorkingHour {
  day: string;
  from: string;
  to: string;
}

export interface Booking {
  id: string;
  customerId: string;
  serviceId: string;
  date: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentStatus: 'paid' | 'unpaid' | 'free';
  createdAt: string;
  updatedAt: string;
  price: number;
  referrerId?: string | null;
}

export interface QRCode {
  id: string;
  customerId: string;
  url: string;
  imageUrl: string;
  createdAt: string;
  scansCount: number;
  lastScanned?: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  createdAt: string;
  totalPaid: number;
  totalFreeHours: number;
  transactions: ReferralTransaction[];
}

export interface ReferralTransaction {
  bookingId: string;
  date: string;
  amount: number;
  freeHoursEarned: number;
}

export interface Transaction {
  id: string;
  customerId: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'card' | 'cash' | 'free';
  stripePaymentId?: string;
  createdAt: string;
  referrerId?: string | null;
  rewardAmount: number;
  rewardHours: number;
}

export interface Notification {
  id: string;
  recipientId: string;
  type: string;
  title: string;
  message: string;
  data: any;
  read: boolean;
  createdAt: string;
  sentViaEmail: boolean;
  sentViaPush: boolean;
}

export interface AdminAction {
  id: string;
  adminId: string;
  customerId: string;
  type: string;
  value: number;
  reason: string;
  createdAt: string;
  relatedTransactionId?: string | null;
}
