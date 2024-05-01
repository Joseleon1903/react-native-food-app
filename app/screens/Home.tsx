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

export default function Home() {

  const [categoryItems, setCategoryItems] = useState<Category[]>(CategoryData.categories as Category[]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);


  const [selectedChoice, setSelectedChoice] = useState(null);
  const [selectedChoiceSection, setSelectedChoiceSection] = useState(null);
  
  console.log(selectedValue + " - " +selectedCategory);
  console.log(selectedChoice + " - " +selectedChoiceSection);


  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          
          <HomeHeader />

          <ScrollView style={styles.scrollContent}
                      showsVerticalScrollIndicator={false}>

                        <CategoryList items={categoryItems} 
                                      setSelectedCategory={setSelectedCategory} 
                                      setSelectedSection={setSelectedSection}
                                      setSelectedValue={setSelectedValue}/> 

          </ScrollView>

          <ChoicesList  setSelectedChoice={setSelectedChoice} setSelectedSection={setSelectedChoiceSection}/>

          <View>

            <Heading heading="Nearby restaurants"></Heading>

            <NearByRestaurants></NearByRestaurants>

            <Divider />

            <Heading heading="Try something new"></Heading>



          </View>


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
  }
  
});
