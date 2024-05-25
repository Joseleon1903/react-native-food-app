import { StyleSheet, Text, View , Image, TouchableOpacity, FlatList} from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import pages from './page.style'
import { COLORS, WINDOW } from '../constants/theme'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CartCountContext } from '../context/CartCountContext'
import { CartCountContextType } from '../context/type/CartCountContextType'
import { RootStackParamList } from '../navigation/types/RootStackParamList'
import CartItem from '../types/CartItem'

type Props = NativeStackScreenProps<RootStackParamList, "FoodPage", "FoodNav">;


export default function Cart({ route, navigation }: Props) {

  const { cartCount, setCartCount, cartItem, setCartItem } = useContext(CartCountContext) as CartCountContextType;


  const renderCartItem = ({ item }: { item: CartItem }) => {
    return <Text> {item.productId?.title}</Text> 
  };

  const handlerClear = () =>{
    console.log("on clean press");
    setCartItem([]);
    setCartCount(0);
  }

  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>

            <View>

                <View style={styles.imageContainer}>

                    <Image style={styles.image} source={ require("../../assets/images/shopping_cart.png")} ></Image>

                    <Text style={styles.title}>Shopping Cart</Text>
                </View>              

            </View>

            {/* lista cart item */}

            <View style={styles.cartContainer}>

                <FlatList
                    data={cartItem}
                    showsVerticalScrollIndicator={false}
                    style={styles.menuList}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={true}
                    renderItem={renderCartItem}
                    />

            </View>


            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

              <TouchableOpacity style={styles.purchaseBtn} >
                  <Text style={styles.purchaseTxt}> Purchase </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.purchaseBtn} onPress={handlerClear}>
                  <Text style={styles.purchaseTxt}> Clear </Text>
              </TouchableOpacity>

            </View>

        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightWhite,
    height: WINDOW.Height
  },
  imageContainer: {
    flex: 0,
    width: WINDOW.Width,
    height: WINDOW.Height/6,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
},
image:{
  marginTop:30,
  width: 60,
  height:60,
  resizeMode: 'contain'
},
title:{
  fontSize: 22,
  fontFamily: 'medium',
  color: COLORS.black
},
purchaseBtn: {
  marginVertical: 20,
  marginHorizontal: 10,
  fontFamily: "bold",
  fontSize: 35,
  color: COLORS.white,
  backgroundColor:  COLORS.primary,
  borderRadius:30
 },
purchaseTxt: {
  marginVertical:5,
  marginHorizontal: 30,
  fontFamily: "bold",
  fontSize: 20,
  textAlign:"center",
  color: COLORS.white,
},
cartContainer: {
  marginTop: 5
},
menuList:{
  marginTop: 5
}


})