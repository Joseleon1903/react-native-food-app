import { StyleSheet,Image, Text, View } from 'react-native'
import React from 'react'
import Category from '../types/Category';
import { COLORS , SHADOWS} from '../constants/theme';

type CategoryItemProps= {
    category: Category;
    selected: string
};


export default function CategoryItem ({category, selected}: CategoryItemProps){

  return (
    <View style={styles(category, selected).item}>

        <Image style={styles(category, selected).image} source={{uri: category.imageUrl}} />
        <Text style={styles(category, selected).categoryText}>{category.title}</Text>

    </View>

  )
}

const styles =  (item : Category,selected : string ) => StyleSheet.create({
    item: {
        marginLeft: 12,
        padding: 5, 
        alignItems: 'center',
        width: 80,
        height: 50,
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: item.value ==selected? COLORS.secondary : 'transparent',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    image: {
        width: 30,
        height: 30
    },
    categoryText:{
        fontSize: 13, 
        fontFamily: 'regular'
    }
});