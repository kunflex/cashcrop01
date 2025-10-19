// types.ts
export type RootStackParamList = {
  HomeScreen: undefined;
  CropDetails: {
    crop: {
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
