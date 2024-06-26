import {StyleSheet, View } from "react-native";
import { ScrollView } from 'react-native-virtualized-view';
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from './page.style';
import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";
import Category from "../types/Category";
import CategoryData from '../data/category.json';
import ChoicesList from "../components/ChoicesList";
import Heading from "../components/Heading";
import NearByRestaurants from "../components/NearByRestaurants";
import Divider from "../components/Divider";
import NewFoodList from "../components/NewFoodList";
import { WINDOW } from "../constants/theme";
import { choicesList } from "../types/Choise";
import Restaurant from "../types/Restaurant";
import RestaurantsData from '../data/restaurants.json';
import FoodsData from '../data/foods.json';
import Food from "../types/Food";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/types/RootStackParamList";
import HomeCategories from "../components/HomeCategories";
import { LoginContextType } from "../context/type/LoginContextType";
import { LoginContext } from "../context/LoginContext";
import {fetchRestaurant} from "../hook/useRestaurantHook";
import {fetchFoods} from "../hook/useFoodHook";
import { OnlineServiceContext } from "../context/OnlineServiceContext";
import { OnlineServiceContextType } from "../context/type/OnlineServiceContextType";
import HomeHeaderLogout from "../components/HomeHeaderLogout";

type Props = NativeStackScreenProps<RootStackParamList, "FoodPage", "FoodNav">;


export default function Home({ route, navigation }: Props) {
  
  const [categoryItems, setCategoryItems] = useState<Category[]>(CategoryData.categories as Category[]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(RestaurantsData.restaurants as Restaurant[]);
  const [foods, setFoods] = useState<Food[]>(FoodsData.foods as Food[]);

  const { profileObj, setProfileObj, login, setLogin} = useContext(LoginContext) as LoginContextType;

  const {  onlineService, setOnlineService} = useContext(OnlineServiceContext) as OnlineServiceContextType;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [selectedChoiceSection, setSelectedChoiceSection] = useState(null);

  const choisesArray = choicesList;


  useEffect( () => {
    console.log("entering validation onlineService");

    if(onlineService.isInternetConnected && onlineService.isOnlineApi){

       console.log(" online service connected");
        fetchRestaurant(onlineService.baseApi).then((response) => {
          console.log(response?.length);
          setRestaurants(response as Restaurant[]);
        }).catch((error) =>{
          console.log(error)
        }
      );

      fetchFoods(onlineService.baseApi).then((response) => {
          console.log(response?.length);
          setFoods(response as Food[]);
        }).catch((error) =>{
          console.log(error)
        }
      );

    }
    
    console.log("entering validation user login");
    if(!login && onlineService.isInternetConnected && onlineService.isOnlineApi ){
      navigation.navigate("FoodNav", { screen: "LoginPage"});
    }

  }, [])

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>

          <ScrollView style={styles.scrollNewFoodContent}
                      showsVerticalScrollIndicator={true}>
               {
                login ?  <HomeHeader /> : <HomeHeaderLogout/>
               }
             

              <ScrollView style={styles.scrollContent}
                          showsVerticalScrollIndicator={false}>

                            <CategoryList items={categoryItems} 
                                          setSelectedCategory={setSelectedCategory} 
                                          setSelectedSection={setSelectedSection}
                                          setSelectedValue={setSelectedValue}/> 

              </ScrollView>

              <ChoicesList choices={choisesArray}  setSelectedChoice={setSelectedChoice} setSelectedSection={setSelectedChoiceSection}/>

              <View>

                { selectedCategory !== null && selectedChoiceSection !=null ?
                  (
                    <View>

                          <Heading heading={`Browser by ${selectedSection} `}></Heading>

                          <HomeCategories category={selectedValue} choise={selectedChoice}></HomeCategories>



                    </View>
                  ) : 

                  (

                    <View>

                            <Heading heading="Nearby restaurants"></Heading>

                            <NearByRestaurants restaurants={restaurants}></NearByRestaurants>

                            <Divider />

                            <Heading heading="Try something new"></Heading>


                            <NewFoodList foods={foods} />

                    </View>
                  )
                }

              </View>

          </ScrollView>

        </View>
      </View> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent:{
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    height: 60,
  },
  scrollNewFoodContent:{
    height: WINDOW.Height - 60,
  }
  
});
