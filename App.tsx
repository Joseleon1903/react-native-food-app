import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from "expo-splash-screen";
import BottomTab from './app/navigation/BottomTab';
import FoodNavigator from './app/navigation/FoodNavigator';
import Restaurant from './app/types/Restaurant';
import {EmptyCartItem, EmptyOnlineService, EmptyProfile, EmptyRestaurant, EmptyWallet} from './app/utils/TypesUtils';
import { RestaurantContext } from './app/context/RestaurantContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from './app/context/LoginContext';
import Profile from './app/types/Profile';
import { CartCountContext } from './app/context/CartCountContext';
import CartItem from './app/types/CartItem';
import OnlineService from './app/types/OnlineService';
import { OnlineServiceContext } from './app/context/OnlineServiceContext';
import SignUpNavigator from './app/navigation/SignUpNavigator';
import {fetchCheckOnlineApi} from "./app/hook/useCheckOnlineApi";
import Wallet from './app/types/Wallet';
import { WalletContext } from './app/context/WalletContext';

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
  const [cartItem, setCartItem] = useState<CartItem[]>(EmptyCartItem);
  const [wallet, setWallet] = useState<Wallet>(EmptyWallet);

  const [onlineService, setOnlineService] = useState<OnlineService>(EmptyOnlineService);

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

  const checkApiStatus = async () => {
    
    console.log("entering checkApiStatus");

    fetchCheckOnlineApi(onlineService.baseApi).then((response) => {
      console.log(response);

      const onlineService : OnlineService = {
          sessionId: "session-id-00000100011001",
          isOnlineApi: true,
          isInternetConnected: true,
          baseApi: "https://86b5-2001-1308-28f1-e000-e505-6986-e60b-5481.ngrok-free.app"
      };

      setOnlineService(onlineService);
      
      }).catch((error) =>{
        const onlineService : OnlineService = {
          sessionId: "session-id-00000100011001",
          isOnlineApi: false,
          isInternetConnected: false,
          baseApi: "https://86b5-2001-1308-28f1-e000-e505-6986-e60b-5481.ngrok-free.app"
      };
      setOnlineService(onlineService);
      }
    );
  };

  return (

    <OnlineServiceContext.Provider value={{ onlineService , setOnlineService}}> 
      <LoginContext.Provider value={{ profileObj , setProfileObj, login, setLogin}}>
        <CartCountContext.Provider value={{cartCount , setCartCount,cartItem, setCartItem}}>
          <RestaurantContext.Provider value={{ restaurantObj , setRestaurantObj}}>
            <WalletContext.Provider value={{ wallet , setWallet}}> 
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

                  <Stack.Screen
                      name='SignUpNav'
                      component={SignUpNavigator}
                      options={{ headerShown: false }}
                    />
                  
                  </Stack.Navigator>

              </NavigationContainer>
            </WalletContext.Provider> 
          </RestaurantContext.Provider>
        </CartCountContext.Provider>
      </LoginContext.Provider>
    </OnlineServiceContext.Provider>
  );
}
