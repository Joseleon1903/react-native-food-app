import { FlatList, StyleSheet,Text, View } from 'react-native'
import FoodsData from '../data/foods.json'
import Food from '../types/Food';
import { useState } from 'react';
import FoodMenuItem from './FoodMenuItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/RootStackParamList';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FoodPage',
  'FoodNav'
>;


export default function HomeCategories() {

    const navigation =  useNavigation<ProfileScreenNavigationProp>();

    const [foods, setFoods] = useState<Food[]>(FoodsData.foods as Food[]);

    const renderFoodItem = ({ item }: { item: Food }) => {
        return <FoodMenuItem food={item} goDetails={ () => navigation.navigate("FoodNav", { screen: "FoodPage" , params : {food : item}})  } ></FoodMenuItem> 
      };

    return (
        <View style={styles.wrapper}>

          <FlatList
                data={foods}
                showsVerticalScrollIndicator={false}
                style={styles.menuList}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
                renderItem={renderFoodItem}
                />

        </View>
    )

}
const styles = StyleSheet.create({
    wrapper:{
        marginLeft:5,
        marginBottom:12
    },
    menuList:{
        marginTop: 5
    }
    
});
  