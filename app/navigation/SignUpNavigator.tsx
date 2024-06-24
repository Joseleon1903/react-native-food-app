import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types/RootStackParamList';
import SignUpPage from '../screens/registration/SignUpPage';

const RootStack = createStackNavigator<RootStackParamList>();

export default function SignUpNavigator() {

    return (

        <RootStack.Navigator initialRouteName="SignUpPage">
            
            <RootStack.Screen
                name="SignUpPage"
                component={SignUpPage}
                options={{headerShown: false}} 
            />
        
        </RootStack.Navigator>
    )

}