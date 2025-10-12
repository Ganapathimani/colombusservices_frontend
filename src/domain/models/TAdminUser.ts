export type TAdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'ADMIN' | 'STAFF' | 'CUSTOMER' | 'ASSISTANT' | string;
  branchId: string;
  companyName: string | null;
  gstNumber: string | null;
  staffRole: string | null;
  createdAt: string; // ISO date string
};
