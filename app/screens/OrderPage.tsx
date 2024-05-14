import { StyleSheet,Text, TouchableOpacity, View, Image } from 'react-native'
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { CartCountContext } from '../context/CartCountContext';
import { CartCountContextType } from '../context/type/CartCountContextType';
import { COLORS, WINDOW } from '../constants/theme';
import BackBtn from '../components/BackBtn';
import ShareBtn from '../components/ShareBtn';
import NetworkImage from '../components/NetworkImage';
import Counter from '../components/Counter';
import Quantity from '../components/Quantity';
import CartItem from '../types/CartItem';
import AdditiveListView from '../components/AdditiveListView';

type Props = NativeStackScreenProps<RootStackParamList, "OrderPage", "FoodNav">;

export default function OrderPage({ route, navigation }: Props) {

    const orderTitle= route.params.title as string;
    const orderDesc = route.params.description as string;
    const imageUrl = route.params.imageUrl[0] as string;

    const cart =  route.params.cardItem as CartItem;

    const { cartCount, setCartCount, cartItem } = useContext(CartCountContext) as CartCountContextType;

    const goBack = () =>{navigation.goBack();}

    return (
        <View style={styles.container}>

            <View>

                <BackBtn onPress={goBack} /> 

                <ShareBtn />

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


                        <View style={{flex: 1}}>
                          <Text style={[styles.subtitle, {fontFamily: 'bold'}] }>Additives</Text>
                          <AdditiveListView additives={cart.additives}></AdditiveListView>

                        </View>

                    </View>
                </View>


            </View>

            <View style={{flex: 1}}>

                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.loginTxt}> Add Cart </Text>

                </TouchableOpacity>

            </View>




        </View>
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
  