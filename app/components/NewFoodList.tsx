import { StyleSheet, View, Text, FlatList} from 'react-native'
import { COLORS, WINDOW } from '../constants/theme';
import RestaurantsData from '../data/foods.json'
import Food from '../types/Food';
import { useState } from 'react';
import FoodComponent from './FoodComponent';
import { useNavigation } from '@react-navigation/native';
import FoodPage from '../screens/FoodPage';
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FoodPage',
  'FoodNav'
>;
export default function NewFoodList() {

    const [foods, setFoods] = useState<Food[]>(RestaurantsData.foods as Food[]);

    const navigation =  useNavigation<ProfileScreenNavigationProp>();

    const renderItem = ({ item }: { item: Food }) => {
        return <FoodComponent item={item} onPress={ () => navigation.navigate("FoodNav", { screen: 'FoodPage', params : {food : item}})  }></FoodComponent>
    };
    
    
    return (

        <FlatList
            style={styles.list}
            data={foods}
            scrollEnabled={true}
            renderItem={renderItem}
            >
        </FlatList>

    );

}
const styles = StyleSheet.create({
    container: {
        marginLeft: 12,
        marginBottom: 10
      },
      list:{
          marginTop: 5,
          rowGap: 10
      }
});
  