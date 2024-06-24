import { useState } from 'react';
import { StyleSheet,Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import FoodsData from '../../data/foods.json'
import Food from '../../types/Food';
import FoodMenuItem from '../../components/FoodMenuItem';
import { RootStackParamList } from '../../navigation/types/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FoodPage',
  'FoodNav'
>;

export default function MenuTab() {

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
  