import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity,FlatList , Text } from "react-native";
import Category from "../types/Category";
import CategoryItem from "./CategoryItem";

type CategoryListProps= {
    items?: Category[];
    setSelectedCategory?: any;
    setSelectedSection?:any;
    setSelectedValue?: any;
};
  

export default function CategoryList({ items, setSelectedCategory, setSelectedSection, setSelectedValue } : CategoryListProps) {

    const [selected, SetSelected] = useState<any>('');

    const categories = [1,2,3,4,5];

    const handleSelectedCategory = (item : Category) =>{
      console.log("Entering handleSelectedCategory");

      if(selected == item.value){
        setSelectedCategory(null);
        SetSelected(null);
        setSelectedSection(null);
        setSelectedValue(null);
      }else{
        setSelectedCategory(item.id);
        SetSelected(item.value);
        setSelectedSection(item.title);
        setSelectedValue(item.value);
      }
    }

    const renderItem = ({ item }: { item: Category }) => {
        return <TouchableOpacity onPress={() =>handleSelectedCategory(item)}>
                    <CategoryItem selected={selected} category={item}/>
                </TouchableOpacity>;
    };

  return (
    <FlatList
     data={items}
     showsHorizontalScrollIndicator={true}
     horizontal={true}
     scrollEnabled={true}
     keyExtractor={item => item.id}
     renderItem={renderItem}
    >
    </FlatList>
  );
}

const styles = StyleSheet.create({
 
});