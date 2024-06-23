import { StyleSheet,Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import { CartCountContext } from '../context/CartCountContext';
import { CartCountContextType } from '../context/type/CartCountContextType';
import { COLORS, WINDOW } from '../constants/theme';
import BackBtn from '../components/BackBtn';
import ShareBtn from '../components/ShareBtn';
import NetworkImage from '../components/NetworkImage';
import Quantity from '../components/Quantity';
import CartItem from '../types/CartItem';
import AdditiveListView from '../components/AdditiveListView';
import CustomModal, { ConfirmationType, ModalType } from '../components/CustomModal';

type Props = NativeStackScreenProps<RootStackParamList, "OrderPage", "FoodNav">;

export default function OrderPage({ route, navigation }: Props) {

    const orderTitle= route.params.title as string;
    const orderDesc = route.params.description as string;
    const imageUrl = route.params.imageUrl[0] as string;

    const cart =  route.params.cardItem as CartItem;

    const { cartCount, setCartCount, cartItem, setCartItem } = useContext(CartCountContext) as CartCountContextType;

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);


    const goBack = () =>{navigation.goBack();}


    const addCart = async(cart : CartItem) => {
        console.log("entering into addCart");
        setCartCount(cartCount +1);
        setCartItem([...cartItem , cart]);
    }


    const doOrder = () => {


        console.log("cart info : "+ cart);
        console.log("cartCount : "+ cartCount);
        console.log("cartItem length: "+ cartItem.length);

        addCart(cart);

        console.log("redirigiendo al carrito");

        navigation.navigate("Cart");
    }

    return (
        <SafeAreaView>

            <CustomModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} modalType={ModalType.warning}
                    title='functionality not available' content="This functionality is not available in this version" confirmationType={ConfirmationType.close} />

            <View style={styles.container}>

                <View>

                    <BackBtn onPress={goBack} /> 

                    <ShareBtn onPress={ () => setIsModalVisible(true)} />

                    <View style={styles.imageContainer}>

                        <Image style={styles.image} source={ require("../../assets/images/order_image.png")} ></Image>

                        <Text style={styles.titleLogin}>Foodly Order</Text>
                    </View>              

                </View>

                <View style={{flex: 1}}>

                    <View style={{flexDirection: 'row', marginTop: 10}}>

                        <View style={[styles.wrapper , styles.shadowStyle]}>
                            <NetworkImage data={imageUrl} height={300} width={150} radius={15} />
                        </View>

                        <View style={{flex: 1}}>

                            <Text style={styles.title}>{orderTitle}</Text>
                            <Text style={styles.subtitle}>{orderDesc}</Text>

                            <Quantity counter={cart.quantity} ></Quantity>

                            {

                                (cart.additives && cart.additives?.length > 0 ) ? 
                                (
                                    <View style={{flex: 1}}>
                                      <Text style={[styles.subtitle, {fontFamily: 'bold'}] }>Additives</Text>
                                      <AdditiveListView additives={cart.additives}></AdditiveListView>
                                    </View>
                                 ) :(<View></View>)
                            }
                            



                        </View>
                    </View>


                </View>

                <View style={{flex: 1}}>

                    <TouchableOpacity style={styles.loginBtn} onPress={doOrder}>
                        <Text style={styles.loginTxt}> Add Cart </Text>
                    </TouchableOpacity>
                    

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
    title:{
        fontSize: 22,
        fontFamily: 'medium',
        color: COLORS.black
    },
    subtitle:{
        fontSize: 14,
        fontFamily: 'normal',
        color: COLORS.black
    },
    imageContainer: {
        flex: 0,
        width: WINDOW.Width,
        height: WINDOW.Height/6,
        borderBottomRightRadius: 30,
        backgroundColor: COLORS.primary1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        marginTop:30,
        width: 60,
        height:60,
        resizeMode: 'contain'
    },
     titleLogin: {
        marginHorizontal: 60,
        fontFamily: "bold",
        fontSize: 35,
        color: COLORS.primary
     },
     loginBtn: {
        marginVertical: 20,
        marginHorizontal: 10,
        fontFamily: "bold",
        fontSize: 35,
        color: COLORS.white,
        backgroundColor:  COLORS.primary,
        borderRadius:30
       },
    loginTxt: {
        marginVertical:5,
        marginHorizontal: 60,
        fontFamily: "bold",
        fontSize: 20,
        textAlign:"center",
        color: COLORS.white,
    },
    wrapper: {
        backgroundColor: COLORS.offwhite,
        borderRadius: 12, 
        padding: 12,
        marginBottom: 15, 
        paddingRight: 7,
        marginHorizontal: 10
    },
    shadowStyle:{
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
    
});
  