export const endpoint = {
  CarrierLogin: 'CarrierLogin',
  CarrierRegistration: 'CarrierRegistration',
  CarrierDashboard: 'CarrierDashboard',
  Truck: 'Truck',
  GetTrucks: 'Truck/GetTrucks',
  TripByID: 'Trip',
  GetCarrierTrips: 'Trip/GetCarrierTrips',
  TripDetailByID: 'Trip/detail',
  PostTruck: 'Truck/PostTruck',
  Driver: 'Driver',
  GetFreeDrivers: 'Driver/GetFreeDrivers',
  deleteDriver: 'Driver/DeleteDriver',
  GetFreeTruck: 'Truck/GetFreeTrucks',
  truck: 'Truck',
  getBrand: 'Truck/GetBrand',
  getTruckColor: 'Truck/GetTruckColors',
  deleteTruck: 'Truck/DeleteTruck',
  GetDriverTruckToBookTrip: 'Driver/GetDriverTruckToBookTrip',
  withdraw: 'Account/AddRequestWithdrawBalance',
  PostProfile: 'Carrier/PostProfile',
  forgotPassword: 'ForgotPassword',

  // Post:
  PostTruck: 'Truck/PostTruck',
  PostDriver: 'Driver',
  PostBookTrip: 'Trip/PostBookTrip',
  PostTripStatusUpdate: 'Trip/PostTripStatusUpdate',
  changePassword: 'Carrier/PostChangePassword',
  unassignTruck: 'Driver/UnAssignTruck',

  // Account
  Wallet: 'Account/Balance',
  History: 'Account/WalletHistory',
  Statement: 'Account/AccountStatement',
  Revanue: 'Account/Revanue',

  // Profile
  Profile: 'ShipperProfile',
  Invoice: 'Account/Invoice',

  HelpSupport: 'HelpSupport',
  GenerateOTP: 'Trip/PostGenerateDeliveryOTP',
  VerfiyOTP: 'Trip/PostTripStatusUpdate',
};
