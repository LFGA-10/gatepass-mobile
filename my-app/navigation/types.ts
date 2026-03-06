export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  CodeEntry: undefined;
  Registration: undefined;
  Checkout: {
    parentName: string;
    nationalId: string;
    phoneNumber: string;
    studentNames: string;
    visitors: string[];
    totalVisitors: number;
    totalCost: number;
  };
  Payment: {
    parentName: string;
    studentNames: string;
    totalVisitors: number;
    totalCost: number;
    paymentMethod: "momo" | "card";
  };
  Confirmation: {
    parentName: string;
    studentNames: string;
    totalVisitors: number;
    totalCost: number;
  };
};
