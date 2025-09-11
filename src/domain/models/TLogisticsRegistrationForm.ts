export type TDimension = {
  handlingUnit: number,
  length: number,
  width: number,
  height: number,
  cubicFeet: number,
  unit?: 'cm',
};

export type TCargoDetail = {
  package: number,
  netWeight: number,
  crossWeight: number,
  materialType: string,
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

export type TLogisticsRegistrationForm = {
  id?: string,
  customerCompanyName: string,
  customerName: string,
  customerEmail: string,
  customerMobile: string,
  originCompanyName: string,
  originEmailId?: string,
  originContactNumber: string,
  originAddress: string,
  originLocation: string,
  originPincode: string,
  pickupDate?: Date | null,
  destinationCompanyName: string,
  destinationEmailId?: string,
  destinationContactNumber: string,
  destinationAddress: string,
  destinationLocation: string,
  destinationPincode: string,
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
