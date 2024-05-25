import {StyleSheet, View, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from './page.style'
import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";
import Category from "../types/Category";
import CategoryData from '../data/category.json'
import ChoicesList from "../components/ChoicesList";
import Heading from "../components/Heading";
import NearByRestaurants from "../components/NearByRestaurants";
import Divider from "../components/Divider";
import NewFoodList from "../components/NewFoodList";
import { WINDOW } from "../constants/theme";
import { choicesList } from "../types/Choise";
import Restaurant from "../types/Restaurant";
import RestaurantsData from '../data/restaurants.json'
import FoodsData from '../data/foods.json'
import Food from "../types/Food";
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { RootStackParamList } from "../navigation/types/RootStackParamList";
import HomeCategories from "../components/HomeCategories";
import { LoginContextType } from "../context/type/LoginContextType";
import { LoginContext } from "../context/LoginContext";
import {fetchRestaurant} from "../hook/useRestaurantHook"
import axios from 'axios';
import { OnlineServiceContext } from "../context/OnlineServiceContext";
import { OnlineServiceContextType } from "../context/type/OnlineServiceContextType";

type Props = NativeStackScreenProps<RootStackParamList, "FoodPage", "FoodNav">;


export default function Home({ route, navigation }: Props) {
  
  const [categoryItems, setCategoryItems] = useState<Category[]>(CategoryData.categories as Category[]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(RestaurantsData.restaurants as Restaurant[]);
  const [foods, setFoods] = useState<Food[]>(FoodsData.foods as Food[]);

  const { profileObj, setProfileObj, login, setLogin} = useContext(LoginContext) as LoginContextType;

  const {  onlineService, setOnlineService} = useContext(OnlineServiceContext) as OnlineServiceContextType;



  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);


  const [selectedChoice, setSelectedChoice] = useState(null);
  const [selectedChoiceSection, setSelectedChoiceSection] = useState(null);
  
  console.log(selectedValue + " - " +selectedCategory);
  console.log(selectedChoice + " - " +selectedChoiceSection);

  const choisesArray = choicesList;


  useEffect( () => {

    console.log("entering validation user login");

    console.log("entering validation onlineService");

    if(onlineService.isInternetConnected && onlineService.isOnlineApi){
       console.log(" online service connected");
        fetchRestaurant().then((response) => {
          console.log(response);
          setRestaurants(response as Restaurant[]);
        }).catch((error) =>{
          console.log(error)
        }
      );
    }

   


    // if(!login){
    //   navigation.navigate("FoodNav", { screen: "LoginPage"});
    // }

  }, [])

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>

          <ScrollView style={styles.scrollNewFoodContent}
                      showsVerticalScrollIndicator={true}>
          
              <HomeHeader />

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

                          <Heading heading={`Browser by ${selectedValue} `}></Heading>

                          <HomeCategories ></HomeCategories>



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
