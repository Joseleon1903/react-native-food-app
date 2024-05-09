import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useContext } from 'react'
import {COLORS, WINDOW} from '../constants/theme'
import Restaurant from '../types/Restaurant';
import NetworkImage from './NetworkImage';
import { RatingInput } from 'react-native-stock-star-rating';
import { StackNavigationState, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RestaurantContext } from '../context/RestaurantContext';
import { RestaurantContextType } from '../context/type/RestaurantContextType';

type StoreComponentProps = {
    item: Restaurant
};

export default function StoreComponent({item }: StoreComponentProps){

    const navigation = useNavigation();

    const {restaurantObj , setRestaurantObj} = useContext(RestaurantContext) as RestaurantContextType;


    const goToRestaurants = () =>{
        console.log("navigate to" + item.title);

        navigation.navigate("FoodNav", { screen: "Restaurant" , params: { restaurant: item}});
        
        setRestaurantObj(item);
    }

  return (
    <TouchableOpacity onPress={goToRestaurants} style={styles.wrapper}>

        <NetworkImage
            data={item.imageUrl}
            width={WINDOW.Width - 80}
            height={WINDOW.Height / 5.8}
            radius={16}
            mode={'cover'}
            >
        </NetworkImage>

        <Text style={styles.heading}>{item.title}</Text>

        <View style={styles.insider}>
            <Text style={styles.small}>Delivery under</Text>
            <Text style={styles.small}>{item.time}</Text>
        </View>

        <View style={styles.insider}>
            <RatingInput 
                rating={item.rating}
                size={14}
                maxStars={5}
                setRating={item.rating}
                bordered={false}
                color={COLORS.primary}
            ></RatingInput>
            <Text style={styles.small}>{item.ratingCount}+ rating</Text>
        </View>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        marginRight: 15,
        backgroundColor: COLORS.lightWhite,
        padding: 8,
        borderRadius: 16
    },
    heading:{
        fontSize: 14,
        fontFamily:'regular',
        color: COLORS.gray
    },
    insider:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    small:{
        fontSize: 14,
        fontFamily:'regular',
        color: COLORS.gray
    }
})