import {TouchableOpacity, StyleSheet,Text, View, FlatList } from 'react-native'
import Restaurant from '../types/Restaurant';
import { useState } from 'react';
import StoreComponent from './StoreComponent';
import {NativeStackHeaderProps} from '@react-navigation/native-stack'

type NearByRestaurantsProps = {
    restaurants: Restaurant[]
    onPress?: () => void;
};

export default function NearByRestaurants({restaurants, onPress }: NearByRestaurantsProps) {


  const renderItem = ({ item }: { item: Restaurant }) => {
    return <StoreComponent item={item} onPress={onPress}></StoreComponent>;
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
  