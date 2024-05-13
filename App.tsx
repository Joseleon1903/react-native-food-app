import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import BottomTab from './app/navigation/BottomTab';
import FoodNavigator from './app/navigation/FoodNavigator';
import Restaurant from './app/types/Restaurant';
import {EmptyProfile, EmptyRestaurant} from './app/utils/TypesUtils';
import { RestaurantContext } from './app/context/RestaurantContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from './app/context/LoginContext';
import Profile from './app/types/Profile';
import { CartCountContext } from './app/context/CartCountContext';

const Stack = createNativeStackNavigator();

export default function App() {
    
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const [restaurantObj, setRestaurantObj] = useState<Restaurant>(EmptyRestaurant);
  const [profileObj, setProfileObj] = useState<Profile>(EmptyProfile);
  const [login, setLogin] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState(0);


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }

  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem('token');

    if(userToken !== null){
      setLogin(true);
    }else{
      setLogin(false);
    }


  };

  return (

    <LoginContext.Provider value={{ profileObj , setProfileObj, login, setLogin}}>
      <CartCountContext.Provider value={{ cartCount , setCartCount}}>
        <RestaurantContext.Provider value={{ restaurantObj , setRestaurantObj}}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name='bottom-navigation'
                component={BottomTab}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                  name='FoodNav'
                  component={FoodNavigator}
                  options={{ headerShown: false }}
                />
              
              </Stack.Navigator>


          </NavigationContainer>
        </RestaurantContext.Provider>
      </CartCountContext.Provider>
    </LoginContext.Provider>
  );
}
