import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Home from "../screens/Home";
import { COLORS } from "../constants/theme";
import Profile from "../screens/Profile";
import Cart from "../screens/Cart";
import { CartCountContext } from "../context/CartCountContext";
import { LoginContext } from "../context/LoginContext";
import { LoginContextType } from "../context/type/LoginContextType";
import LoginPage from "../screens/LoginPage";
import { CartCountContextType } from "../context/type/CartCountContextType";

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  backgroundColor: COLORS.primary,
  borderTopWidth: 0,
  elevation: 0, // This will remove the shadow on Android
  shadowOpacity: 0, // This will remove the shadow on iOS
};

export default function BottomTab () {

  const {  profileObj, setProfileObj, login, setLogin} = useContext(LoginContext) as LoginContextType;

  const {  cartCount, setCartCount} = useContext(CartCountContext) as CartCountContextType;


  console.log("profileObj: "+ profileObj);
  console.log("login : "+ login);
  console.log("cartCount : "+ cartCount);

  // const {count, isCartLoading, error, refetch} =fetchCartCount();
  
  // const { cartCount, setCartCount } = useContext(CartCountContext);

  // if(isCartLoading){
  //   setCartCount(count)
  // }
  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={COLORS.secondary}
      tabBarHideKeyBoard={true}
      headerShown={false}
      inactiveColor="#3e2465"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur : true,
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />


      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 26, height: 26, position: 'relative' }}>
            <FontAwesome
                name={
                    focused ? "opencart" : "opencart"
                }
                color={focused ? COLORS.secondary : COLORS.secondary1}
                size={26}
            />
            
                <View
                    style={{
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 7,
                        width: 14,
                        height: 14,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 10 }}>{cartCount}</Text>
                </View>
            
        </View>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ login? Profile : LoginPage}
        options={{
          tabBarStyle: tabBarStyle,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={focused ? COLORS.secondary : COLORS.secondary1}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};