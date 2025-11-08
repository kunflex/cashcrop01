// Define Farm type
export type Farm = {
  id: string;
  cropType: string;
  location: string;
  image: any; // For require() images
  activities: Record<string, { selected: boolean; marked: boolean; selectedColor: string }>;
};

// Define navigation stack params
export type RootStackParamList = {
  HomeScreen: undefined;
  MyFarms: undefined;
  PostScreen: undefined;
  ActivityTracker: { farm: Farm };
  CropDetails: {
    crop: {
      uses: any;
      cultivationtips: any;
      uses: any;
      id: number;
      name: string;
      image: string;
      description: string;
      likes: number;
      lifecycle: string;
      diseases: string;
      pests: string;
    };
  };
};
