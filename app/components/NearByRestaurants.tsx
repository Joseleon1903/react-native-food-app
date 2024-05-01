import {TouchableOpacity, StyleSheet,Text, View, FlatList } from 'react-native'
import Restaurant from '../types/Restaurant';
import RestaurantsData from '../data/restaurants.json'
import { useState } from 'react';
import StoreComponent from './StoreComponent';

type HeadingProps = {
    heading :  string,
    onPress?: () => void;

};

export default function NearByRestaurants() {

  const [restaurants, setRestaurants] = useState<Restaurant[]>(RestaurantsData.restaurants as Restaurant[]);


  const renderItem = ({ item }: { item: Restaurant }) => {
    return <StoreComponent item={item}></StoreComponent>;
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
  