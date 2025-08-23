export type TDimension = {
  handlingUnit: string;
  length: number;
  width: number;
  height: number;
  cubicFeet: number;
};

export type TCargoDetail = {
  package: string;
  cbm: string;
  weight: string;
  materialType: string;
  photo: File | null;
  hasDimensions: boolean;
  dimensions: TDimension[];
};

export type TLogisticsRegistrationForm = {
  companyName: string;
  emailId: string;
  phoneNumber: string;
  vehicleType: string;
  vehicleModel: string;
  ftlType: 'console' | 'separate';
  loadingType: 'stackable' | 'non-stackable';
  cargoDetails: TCargoDetail[];

  originCustomerName: string;
  originAddress: string;
  originLocation: string;
  originPincode: string;
  originEmailId?: string;
  originContactNumber: string;
  pickupDate: Date | null;

  destinationCustomerName: string;
  destinationAddress: string;
  destinationEmailId?: string;
  destinationLocation: string;
  destinationPincode: string;
  destinationContactNumber: string;
};
