import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { FlatList, StyleSheet,Text, View } from 'react-native'
import FoodMenuItem from '../../components/FoodMenuItem';
import { RootStackParamList } from '../../navigation/types/RootStackParamList';
import Food from '../../types/Food';
import FoodsData from '../../data/foods.json'

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FoodPage',
  'FoodNav'
>;

export default function NewsTab() {

    const navigation =  useNavigation<ProfileScreenNavigationProp>();

    const [foods, setFoods] = useState<Food[]>(FoodsData.foods as Food[]);

    const renderFoodItem = ({ item }: { item: Food }) => {
        return <FoodMenuItem food={item} goDetails={ () => navigation.navigate("FoodNav", { screen: "FoodPage" , params : {food : item}})  } ></FoodMenuItem> 
      };

    return (
        <View style={styles.container}>

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
    container: {
        marginTop: 5
    },
    menuList:{
        marginTop: 5
    }
});
  