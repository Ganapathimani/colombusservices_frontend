export type TMaterial = {
  handlingUnit: number,
  length: number,
  width: number,
  height: number,
  cubicFeet: number,
  unit?: 'CM',
  materialType: string;
};

export type TPackages = {
  packageCount: number,
  netWeight: number,
  grossWeight: number,
  totalCubicFeet?: number,
  imageUrl: File | null,
  materials: TMaterial[],
  hasDimensions?: boolean,
};

export type TDocumentUpload = {
  ewayBillUrl?: string;
  ewayBillLink?: string;
  packageListUrl?: string;
  invoiceUrls?: string[];
  lrNumber?: string;
  lrUrl?: string;
  manifestLocation?: 'Chennai Airport' | 'Chennai Seaport' | 'Thoothukudi' | 'Bangalore' | 'Tirupur';
};

export type TDeliveries = {
  companyName: string,
  contactPerson?: string,
  email?: string,
  mobile?: string,
  address: string,
  location: string,
  pinCode?: string,
};

export type TPickUp = {
  companyName: string,
  contactPerson?: string,
  email?: string,
  mobile: string,
  address: string,
  location: string,
  pinCode: string,
  pickupDate?: Date | null,
};

export type TVehicles = {
  vehicleType: string,
  ftlType: string,
  loadingType?: string,
  model?: string,
};

export type TLogisticsRegistrationForm = {
  customerId?: string,
  branchId?: string,
  assistantId?: string,
  createdById?: string,
  id?: string,
  bookedCompanyName: string,
  bookedCustomerName: string,
  bookedEmail: string,
  bookedPhoneNumber: string,
  pickups: TPickUp[],
  deliveries: TDeliveries[];
  packages: TPackages[],
  vehicles: TVehicles[],
  rate?: number,
  rateQuotedBy?: string,
  notes?: string,
  status: string,
  vehicleNumber?: string,
  driverMobile?: string,
  driverName?: string,
  pickupTeamNotes?: string,
  documents: TDocumentUpload,
};
