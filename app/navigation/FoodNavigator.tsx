import { StyleSheet,Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import FoodPage from '../screens/FoodPage';
import OrderPage from '../screens/OrderPage';
import { RootStackParamList } from './types/RootStackParamList';
import RestaurantPages from './RestaurantPages';

const RootStack = createStackNavigator<RootStackParamList>();

export default function FoodNavigator() {

    return (

        <RootStack.Navigator initialRouteName="FoodPage">
            
            <RootStack.Screen
                name="FoodPage"
                component={FoodPage}
                options={{headerShown: false}} 
            />

            <RootStack.Group screenOptions={{ headerShown: false, presentation: 'modal'}} >
                <RootStack.Screen  name="OrderPage"component={OrderPage} />
            </RootStack.Group>

            <RootStack.Screen
                name="RestaurantPages"
                component={RestaurantPages}
                options={{headerShown: false}} 
            />
        
        </RootStack.Navigator>
    )

}