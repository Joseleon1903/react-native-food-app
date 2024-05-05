import { StyleSheet,Text, View, Image, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { COLORS, SIZES, WINDOW } from '../constants/theme';
import { NativeStackHeaderProps, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import Food from '../types/Food';
import { useContext, useState } from 'react';
import Additives from '../types/Additives';
import { CartCountContext } from '../context/CartCountContext';
import NetworkImage from '../components/NetworkImage';
import BackBtn from '../components/BackBtn';
import ShareBtn from '../components/ShareBtn';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type Props = NativeStackScreenProps<RootStackParamList, "FoodPage", "FoodNav">;


export default function FoodPage({ route, navigation }: Props) {

    const foodItem = route.params.food as Food

    const [isChecked, setChecked] = useState(false);
    const [additives, setAdditives] = useState<Additives[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [restaurant, setRestaurant] = useState(1);
    const [count, setCount] = useState(1);
    const [preference, setPreference] = useState('');

    //const [cartCount, setCartCount] = useContext(CartCountContext);

    const goBack = () =>{navigation.goBack();}


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


            </View>


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
    }
    
});
  