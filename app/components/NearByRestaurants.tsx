import {StyleSheet,Text, View, FlatList } from 'react-native'
import Restaurant from '../types/Restaurant';
import { useState } from 'react';
import StoreComponent from './StoreComponent';
import {NativeStackHeaderProps, NativeStackScreenProps} from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types/RootStackParamList';

type NearByRestaurantsProps = {
    restaurants: Restaurant[]
};

type Props = NativeStackScreenProps<RootStackParamList, "Restaurant", "FoodNav">;


export default function NearByRestaurants({restaurants}: NearByRestaurantsProps) {

  const renderItem = ({ item }: { item: Restaurant }) => {
    return <StoreComponent item={item} ></StoreComponent>;
  };

    return (
      <View style={styles.container}>

        <FlatList
            style={styles.list}
            data={restaurants}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={renderItem}
            >
        </FlatList>

      </View>
    );
  }
  
  const styles = StyleSheet.create({

    container: {
      marginLeft: 5,
      marginRight: 5
    },
    list:{
        marginTop: 5,
        rowGap: 10
    }
  });
  