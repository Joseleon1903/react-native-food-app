import {StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
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
import {NativeStackHeaderProps} from '@react-navigation/native-stack'

export default function Home({navigation} : NativeStackHeaderProps) {

  const [categoryItems, setCategoryItems] = useState<Category[]>(CategoryData.categories as Category[]);

  const [restaurants, setRestaurants] = useState<Restaurant[]>(RestaurantsData.restaurants as Restaurant[]);

  const [foods, setFoods] = useState<Food[]>(FoodsData.foods as Food[]);



  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);


  const [selectedChoice, setSelectedChoice] = useState(null);
  const [selectedChoiceSection, setSelectedChoiceSection] = useState(null);
  
  console.log(selectedValue + " - " +selectedCategory);
  console.log(selectedChoice + " - " +selectedChoiceSection);

  const choisesArray = choicesList;

  const goToRestaurants =() =>{
    navigation.navigate("FoodNav", { screen: "RestaurantPages"});
  }


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

                <Heading heading="Nearby restaurants"></Heading>

                <NearByRestaurants restaurants={restaurants} onPress={goToRestaurants}></NearByRestaurants>

                <Divider />

                <Heading heading="Try something new"></Heading>


                <NewFoodList foods={foods} />
                      
                


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
