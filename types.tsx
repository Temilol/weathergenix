export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export interface querySuccessResponse {
  id: number,
  cod: number;
  name: string,
  timezone: number,
  visibility: number,
  wind: {
    speed: number,
    deg: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  coord: {
    lon: number,
    lat: number
  },
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>
}

export interface queryErrorResponse {
  cod: string|number,
  message: string
}

export interface List {
  dt: number;
  main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
  };
  weather: Array<
  {
    id: 800;
    main: string;
    description: string;
    icon: string;
  }>;
  clouds: {
      all: number
  };
  wind: {
      speed: number,
      deg: number
  },
  visibility: number;
  pop: number;
  sys: {
    pod: string
  };
  dt_txt: string;

  speed: number;
  deg: number;
  temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
  };
  feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
  };
  sunrise: number;
  sunset: number;
}

interface City {
  id: number;
  name: string;
  coord: {
      lon: number;
      lat: number;
  };
  country: string;
  timezone: number;
}

export interface weatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<List>;
  city: City;
}