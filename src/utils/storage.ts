
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

const STORAGE_KEYS = {
  CUSTOMERS: 'affiliate-customers',
  BUSINESS_INFO: 'affiliate-business-info',
  BOOKINGS: 'affiliate-bookings',
  QR_CODES: 'affiliate-qr-codes',
  REFERRALS: 'affiliate-referrals',
  TRANSACTIONS: 'affiliate-transactions',
  NOTIFICATIONS: 'affiliate-notifications',
  ADMIN_ACTIONS: 'affiliate-admin-actions',
  CURRENT_USER: 'affiliate-current-user'
};

// Generic storage loader
const loadFromStorage = <T>(key: string): T[] => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return [];
  }
};

// Generic storage saver
const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Single item storage functions
const loadSingleItem = <T>(key: string): T | null => {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return null;
  }
};

const saveSingleItem = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Customer functions
export const loadCustomers = (): Customer[] => loadFromStorage<Customer>(STORAGE_KEYS.CUSTOMERS);
export const saveCustomers = (customers: Customer[]): void => saveToStorage(STORAGE_KEYS.CUSTOMERS, customers);

// Business info functions
export const loadBusinessInfo = (): BusinessInfo | null => loadSingleItem<BusinessInfo>(STORAGE_KEYS.BUSINESS_INFO);
export const saveBusinessInfo = (info: BusinessInfo): void => saveSingleItem(STORAGE_KEYS.BUSINESS_INFO, info);

// Booking functions
export const loadBookings = (): Booking[] => loadFromStorage<Booking>(STORAGE_KEYS.BOOKINGS);
export const saveBookings = (bookings: Booking[]): void => saveToStorage(STORAGE_KEYS.BOOKINGS, bookings);

// QR Code functions
export const loadQRCodes = (): QRCode[] => loadFromStorage<QRCode>(STORAGE_KEYS.QR_CODES);
export const saveQRCodes = (codes: QRCode[]): void => saveToStorage(STORAGE_KEYS.QR_CODES, codes);

// Referral functions
export const loadReferrals = (): Referral[] => loadFromStorage<Referral>(STORAGE_KEYS.REFERRALS);
export const saveReferrals = (referrals: Referral[]): void => saveToStorage(STORAGE_KEYS.REFERRALS, referrals);

// Transaction functions
export const loadTransactions = (): Transaction[] => loadFromStorage<Transaction>(STORAGE_KEYS.TRANSACTIONS);
export const saveTransactions = (transactions: Transaction[]): void => saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);

// Notification functions
export const loadNotifications = (): Notification[] => loadFromStorage<Notification>(STORAGE_KEYS.NOTIFICATIONS);
export const saveNotifications = (notifications: Notification[]): void => saveToStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);

// Admin action functions
export const loadAdminActions = (): AdminAction[] => loadFromStorage<AdminAction>(STORAGE_KEYS.ADMIN_ACTIONS);
export const saveAdminActions = (actions: AdminAction[]): void => saveToStorage(STORAGE_KEYS.ADMIN_ACTIONS, actions);

// Current user functions
export const loadCurrentUser = (): Customer | null => loadSingleItem<Customer>(STORAGE_KEYS.CURRENT_USER);
export const saveCurrentUser = (user: Customer | null): void => saveSingleItem(STORAGE_KEYS.CURRENT_USER, user);
export const clearCurrentUser = (): void => localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
