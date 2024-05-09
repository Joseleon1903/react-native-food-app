import { useContext } from 'react';
import { StyleSheet,Text, View } from 'react-native'
import { RestaurantContext } from '../../context/RestaurantContext';
import { RestaurantContextType } from '../../context/type/RestaurantContextType';


export default function DirectionTab() {

    const {restaurantObj , setRestaurantObj} = useContext(RestaurantContext) as RestaurantContextType;

    console.log("restaurantObj: "+ restaurantObj);


    return (
        <View>

            <Text>DirectionTab</Text>
            <Text>{restaurantObj.id}</Text>
            <Text>{restaurantObj.title}</Text>


        </View>
    )

}
const styles = StyleSheet.create({
    
});
  