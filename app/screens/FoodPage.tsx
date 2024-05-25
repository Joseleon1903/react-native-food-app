import { StyleSheet,Text, View, Image, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native'
import { COLORS, SIZES, WINDOW } from '../constants/theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import Food from '../types/Food';
import { useContext, useEffect, useState } from 'react';
import Additives from '../types/Additives';
import BackBtn from '../components/BackBtn';
import ShareBtn from '../components/ShareBtn';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Counter from '../components/Counter';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import CartItem from '../types/CartItem';
import slugify from "slugify"
import { CartCountContext } from '../context/CartCountContext';
import { CartCountContextType } from '../context/type/CartCountContextType';

type Props = NativeStackScreenProps<RootStackParamList, "FoodPage", "FoodNav">;


export default function FoodPage({ route, navigation }: Props) {

    const foodItem = route.params.food as Food

    const [isChecked, setChecked] = useState(false);
    const [additives, setAdditives] = useState<Additives[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [restaurant, setRestaurant] = useState(1);
    const [count, setCount] = useState(1);
    const [preference, setPreference] = useState('');

    const { cartCount, setCartCount, cartItem } = useContext(CartCountContext) as CartCountContextType;

    
    const goBack = () =>{navigation.goBack();}

    console.log("additives :"+ JSON.stringify(additives));


    useEffect( () => {
        calculatePrice();
    }, [additives]);

    const orderPageParams= {
            cardItem: {
                id: slugify( foodItem.title +" "+ Date.now(), {lower: true}),
                userId: slugify("Anonymous" + Date.now(), {lower: true}),
                additives: [...additives],
                instructions: "",
                totalPrice: (foodItem.price+ totalPrice) * count,
                quantity: count,
                version: 1
            },
            title: foodItem.title,
            description: foodItem.description,
            imageUrl: foodItem.imageUrl,
            restaurant: "restaurant name",
            instruction: preference
     }

    const handlerAdditives = (newAdditives: Additives)=>{
        setAdditives( (prevAdditives: Additives[]) =>{
            const existAdd = additives.some( (additive) => additive.id === newAdditives.id);
            // valida si existe ya en la lista 
            if(existAdd){
                return prevAdditives.filter((additive) => additive.id !== newAdditives.id);
            }
            // lo agrega a la lista
            else{
                return [...prevAdditives, newAdditives];
            }
        });
    }

    const handlerPress = (item : Food) => {

        const carItemNew : CartItem = {
            id: slugify( item.title +" "+ Date.now(), {lower: true}),
            userId: slugify("Anonymous" + Date.now(), {lower: true}),
            additives: additives,
            instructions: "",
            totalPrice: (item.price+ totalPrice) * count,
            quantity: count,
            version: 1
        }

        console.log("carItemNew: "+carItemNew);
        addCart(carItemNew);

        navigation.navigate("FoodNav", { screen: "OrderPage" , params : orderPageParams});
    }

    const addCart = async(cart : CartItem) => {
        console.log("entering into addCart");
        console.log("push to the storage or context "+Date.now());
        console.log("carItemNew: "+cart);

        cartItem.push(cart);

        console.log(".............................: ");
        console.log("exiting to addCart");
    }

    const calculatePrice = () => {
        const total = additives.reduce( (sum, additive) => {
            return sum + parseFloat( additive.price);
        }, 0);
        setTotalPrice(total);
    }

    const renderTagItem =({ item }: { item: string }) =>{
        return <View style={styles.tags}>
            <Text style={{paddingHorizontal: 4, color:COLORS.lightWhite}}>{item}</Text>
        </View>

    }

    const renderAdditiveItem =({ item }: { item: Additives }) =>{
        return <View style={styles.additivesView}>
            <BouncyCheckbox 
            size={20}
            unfillColor='#FFFFFF'
            fillColor={COLORS.primary}
            innerIconStyle={{borderWidth: 1}}
            textStyle={styles.small}
            text={item.title}
            onPress={ () =>{handlerAdditives(item)}}
            />

            <Text style={styles.small}>{item.price} $</Text>
        </View>
    }


    return (
        <View style= {styles.container}>

            <View>

                <Image style={styles.image} source={ {uri:foodItem.imageUrl[0]}} ></Image>

                <BackBtn onPress={goBack} /> 

                <ShareBtn />

                <TouchableOpacity style={styles.detailBtn}>

                    <View style= {styles.restaurantBtn}>
                        <Text style={styles.restaurantTxt}>Open the store</Text>
                    </View>
                   
                </TouchableOpacity>

            </View>

            <ScrollView style={styles.scrollNewFoodContent}
                      showsVerticalScrollIndicator={true}>

                <View style={styles.containerPage}>

                <View style= {styles.containerPageRow}>
                    <Text style= {styles.title}>{foodItem.title}</Text>
                    <Text style= {[styles.title ,{ color: COLORS.primary}]}>{(foodItem.price + totalPrice) * count} $</Text>
                </View>

                <Text style={styles.small} >{foodItem.description}</Text>

                <FlatList 
                data={foodItem.foodTags}
                showsVerticalScrollIndicator={false}
                style={{marginTop: 10}}
                horizontal={true}
                scrollEnabled={true}
                keyExtractor={(item) => item}
                renderItem={renderTagItem}
                />

                <Text style={[styles.title, {marginBottom: 10, marginTop: 20}]}>Additives and Topping</Text>

                <FlatList 
                data={foodItem.additives}
                showsHorizontalScrollIndicator={false}
                style={{marginTop: 10}}
                scrollEnabled={false}
                keyExtractor={(item) => item.title}
                renderItem={renderAdditiveItem}
                />

                <Text style={[styles.title, {marginBottom: 10, marginTop: 20}]}>Preferences</Text>

                <View style={styles.input}>

                    <TextInput 
                        placeholder='Add specific instruction'
                        value={preference}
                        onChange={ value => preference}
                        autoCapitalize='none'
                        autoCorrect={false}
                        style={{flex: 1}}
                        />
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop:20}}>

                    <Text style={[styles.title, {marginBottom: 10}]}>Quantity</Text>

                    <Counter counter={count} setCounter={setCount}></Counter>

                </View>


                <View style={{flex: 1, justifyContent:'flex-end'}}>

                    <View style={styles.suspended}>

                        <View style={styles.cart}>
                            <View style={styles.cartRow}>

                                <TouchableOpacity style={styles.cartBtn} disabled={true}>
                                    <AntDesign name='pluscircleo' size={24} color={COLORS.lightWhite} />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.cartBtnOrder} onPress={ () => handlerPress(foodItem) }>
                                    <Text style={[styles.title, {color: COLORS.lightWhite, marginTop: 8 , alignItems: 'center' }]} > Order</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.cartBtn} disabled={true}>
                                    <AntDesign name='pluscircleo' size={24} color={COLORS.lightWhite} />
                                </TouchableOpacity>
                            </View>


                        </View>


                    </View>
                </View>


                </View>

            </ScrollView>


            


        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.lightWhite,
        height: WINDOW.Height
    },
    image: {
        width: WINDOW.Width,
        height: WINDOW.Height/4,
        borderBottomRightRadius: 30
    },
    detailBtn:{
        position: 'absolute',
        bottom: 20,
        right: 0,
    },
    restaurantBtn:{
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 15,
        padding:5,
        marginRight: 10
    },
    restaurantTxt:{
        color: COLORS.lightWhite,
        fontFamily: 'bold'
    },
    containerPage:{
        marginHorizontal: 12,
        marginTop:10
    },
    containerPageRow:{
        flexDirection: 'row',
        justifyContent:'space-between' 

    },
    title:{
        fontSize: 22,
        fontFamily: 'medium',
        color: COLORS.black
    },
    small:{
        fontSize: 13,
        fontFamily: 'regular',
        color: COLORS.gray,
        textAlign: 'justify'
    },
    tags:{
        right: 10,
        marginHorizontal: 10, 
        backgroundColor: COLORS.primary,
        borderRadius: 8
    },
    additivesView:{
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10
    },
    input:{
        color: COLORS.black,
        borderWidth: 1,
        backgroundColor: COLORS.offwhite,
        height: 50, 
        borderRadius: 8, 
        paddingHorizontal: 12, 
        alignItems: 'center',
        flexDirection: 'row'
    },
    suspended:{
        marginBottom: 20,
        width: '100%',
        alignItems: 'center'
    },
    cart:{
        width: WINDOW.Width -24,
        height: 60,
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 30
    },
    cartRow:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginHorizontal:20
    },
    cartBtn:{
        width: 40,
        height: 40,
        borderRadius: 99,
        justifyContent: 'center'
    },
    cartBtnOrder:{
        backgroundColor: COLORS.primary1,
        paddingHorizontal: 60,
        borderRadius: 30
    },
    scrollNewFoodContent:{
        height: WINDOW.Height - 60,
    }
    
});
  