// lib/navigations/types.ts
export type RootStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  DashboardApp: undefined;
  MyFarms: undefined;
  PostScreen: undefined;
  ActivityTracker: { farmId: string };
  CropDetails: { cropId: string };
  UserVerification: undefined;
};

export interface Farm {
  id: string;
  cropType: string;
  location: string;
  image: any; // local require() image
  activities?: Record<string, any>;
}
