export type TDimension = {
  handlingUnit: number,
  length: number,
  width: number,
  height: number,
  cubicFeet: number,
  unit?: 'cm',
  materialType: string;
};

export type TCargoDetail = {
  package: number,
  netWeight: number,
  crossWeight: number,
  photo: File | null,
  hasDimensions: boolean,
  dimensions: TDimension[],
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

export type TDestination = {
  companyName: string;
  emailId?: string;
  contactNumber: string;
  address: string;
  location: string;
  pincode: string;
};

export type TOrigin = {
  companyName: string;
  emailId?: string;
  contactNumber: string;
  address: string;
  location: string;
  pincode: string;
  pickupDate?: Date | null;
};

export type TLogisticsRegistrationForm = {
  id?: string,
  customerCompanyName: string,
  customerName: string,
  customerEmail: string,
  customerMobile: string,
  origins: TOrigin[],
  destinations: TDestination[];
  cargoDetails: TCargoDetail[],
  vehicleType: string,
  vehicleModel: string,
  ftlType: 'console' | 'separate',
  loadingType: 'stackable' | 'non-stackable',
  rate?: number,
  rateQuotedBy?: string,
  notes: string,
  status: string,
  vehicleNumber: string,
  driverMobile: string,
  driverName: string,
  pickupTeamNotes: string,
  documents: TDocumentUpload,
};
