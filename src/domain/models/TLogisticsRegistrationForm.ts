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
  pickupDate: null;

  destinationCustomerName: string;
  destinationAddress: string;
  destinationEmailId?: string;
  destinationLocation: string;
  destinationPincode: string;
  destinationContactNumber: string;
};

export type TCargoDetail = {
  package: string;
  cbm: string;
  weight: string;
  dimensions: string;
};
