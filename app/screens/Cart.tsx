import { StyleSheet, Text, View , Image, TouchableOpacity, FlatList} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import pages from './page.style';
import { COLORS, WINDOW } from '../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CartCountContext } from '../context/CartCountContext';
import { CartCountContextType } from '../context/type/CartCountContextType';
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import CartItem from '../types/CartItem';
import CartItemComponent from '../components/CartItemComponent';
import Divider from '../components/Divider';
import EmptyCartAdvice from '../components/EmptyCartAdvice';
import CustomModal, { ConfirmationType, ModalType } from '../components/CustomModal';
import { OnlineServiceContext } from '../context/OnlineServiceContext';
import { OnlineServiceContextType } from '../context/type/OnlineServiceContextType';

type Props = NativeStackScreenProps<RootStackParamList, "FoodPage", "FoodNav">;


export default function Cart({ route, navigation }: Props) {

  const { cartCount, setCartCount, cartItem, setCartItem } = useContext(CartCountContext) as CartCountContextType;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const {  onlineService, setOnlineService} = useContext(OnlineServiceContext) as OnlineServiceContextType;

  const [totalShoppingCart, setTotalShoppingCart] = useState<number>(0);

  const renderCartItem = ({ item }: { item: CartItem }) => {
    return <CartItemComponent cartItem={item} onDelete={() =>handlerRemoveItem(item)} />
  };

  const handlerClear = () =>{
    console.log("on clean press");
    setCartItem([]);
    setCartCount(0);
  }

  useEffect(() =>{

    let total = 0;
    cartItem.forEach( item =>{
      total = total + item.totalPrice;
    });
    setTotalShoppingCart(total);

  }, [cartCount])

  const handlerRemoveItem = (item :CartItem ):void =>{
    console.log("on clean press");
    const newItemList =  cartItem.filter((cartitem) => cartitem.id !== item.id);
    setCartItem(newItemList);
    setCartCount(cartCount -1);
  }

  const handlerConfirmationModal =()=>{

    if(onlineService.isOnlineApi && onlineService.isInternetConnected){

      setIsModalVisible(true);

      return;
    }
    alert("You need to be logged in to access this functionality");

  }

  const onConfirmPurchase=()=>{
    console.log("purchase confirm");
    handlerClear();
  }
 
  return (
    <SafeAreaView>

      <CustomModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} handlerConfirm={onConfirmPurchase} modalType={ModalType.warning}
                    title='Comfirm your purchase' content={"Total : "+totalShoppingCart + " $"} confirmationType={ConfirmationType.confirmCancel} />

      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>

            <View>

                <View style={styles.imageContainer}>

                    <Image style={styles.image} source={ require("../../assets/images/shopping_cart.png")} ></Image>

                    <Text style={styles.title}>Shopping Cart</Text>
                </View>              

            </View>

            {
            
            cartCount === 0 ? (

              <EmptyCartAdvice></EmptyCartAdvice>

            ) : 

            (
              <View>

                <ScrollView style={styles.scrollNewFoodContent} showsVerticalScrollIndicator={true}>

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
                </ScrollView>

                <Divider />

                <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 30}}>

                  <Text style={styles.title}>Total: </Text>
                  <Text style={styles.title}>$ {totalShoppingCart}</Text>

                </View>


                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                  <TouchableOpacity style={styles.purchaseBtn} disabled={(totalShoppingCart!= 0)? false : true} onPress={handlerConfirmationModal}>
                      <Text style={styles.purchaseTxt}> Purchase </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.purchaseBtn} onPress={handlerClear} disabled={(totalShoppingCart!= 0)? false : true}>
                      <Text style={styles.purchaseTxt}> Clear </Text>
                  </TouchableOpacity>

                </View>

              </View>
              
            )
          
          }

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
  scrollNewFoodContent:{
    maxHeight: WINDOW.Height - 320,
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