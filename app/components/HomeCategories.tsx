import { FlatList, StyleSheet,Text, View } from 'react-native'
import FoodsData from '../data/foods.json'
import Food from '../types/Food';
import { useContext, useEffect, useState } from 'react';
import FoodMenuItem from './FoodMenuItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import { OnlineServiceContext } from '../context/OnlineServiceContext';
import { OnlineServiceContextType } from '../context/type/OnlineServiceContextType';
import { fetchFilterFoods } from '../hook/useFilterFoodHook';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FoodPage',
  'FoodNav'
>;

type HomeCategoriesProps= {
    category?: string;
    choise? : string
}

export default function HomeCategories( {category , choise }: HomeCategoriesProps) {

    const navigation =  useNavigation<ProfileScreenNavigationProp>();
    const {onlineService, setOnlineService} = useContext(OnlineServiceContext) as OnlineServiceContextType;

    const [foods, setFoods] = useState<Food[]>(FoodsData.foods as Food[]);

    useEffect( () =>{
        console.log("filter food");
        loadFoods();

    }, [category, choise])

    const loadFoods =() =>{
        console.log("entering loadFoods");
        console.log("category: " +category);
        console.log("choise: "+ choise);

        if(onlineService.isOnlineApi && category && choise){
            fetchFilterFoods(onlineService.baseApi, category, choise).then((response) => {
                console.log(response?.length);
                setFoods(response as Food[]);
              }).catch((error) =>{
                console.log(error)
              }
            );
        }
    }

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
  