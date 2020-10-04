import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';
import {RootStackParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {SearchPageScreen, WeatherScreen} from '../screens';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={SearchPageScreen} />
      <Stack.Screen name="Weather" component={WeatherScreen} />
    </Stack.Navigator>
  );
}
