import { FlatList, StyleSheet,Text, TouchableOpacity, View, Image } from 'react-native'
import { COLORS } from '../constants/theme';
import Food from '../types/Food';
import NetworkImage from './NetworkImage';
import { RatingInput } from 'react-native-stock-star-rating';


type FoodSaleItemProps = {
    food: Food;
    onPress?: () => void;
    goDetails? : () => void;
};

export default function FoodSaleItem({food, onPress, goDetails} : FoodSaleItemProps) {

    const renderTagItem =({ item }: { item: string }) =>{
        return <View style={styles.tags}>
            <Text style={{paddingHorizontal: 4, color:COLORS.lightWhite}}>{item}</Text>
        </View>

    }

    const randomIntFromInterval = (min:number, max:number) : number=>{ // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
      }

    return (
        <TouchableOpacity style={[styles.wrapper , styles.shadowStyle]} onPress={goDetails}>

            <View style={styles.txtContainer}>
                <NetworkImage data={food.imageUrl[0]} height={75} width={75} radius={15} />

                <View style={{position: 'absolute', right: 0,top: 5, backgroundColor: COLORS.gold, borderRadius: 12 }}>
                    <Text style={[styles.title, {color: COLORS.lightWhite, marginHorizontal: 5}]}>$ {food.price}</Text>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{food.title}</Text>

                    <RatingInput 
                                rating={food.rating}
                                size={20}
                                maxStars={5}
                                setRating={food.rating}
                                bordered={false}
                                color={COLORS.primary}
                            />

                 <FlatList 
                   data={food.foodTags.slice(0,3)}
                   showsVerticalScrollIndicator={false}
                   showsHorizontalScrollIndicator={false}
                   style={{marginTop: 5 , marginBottom:5}}
                   horizontal={true}
                   scrollEnabled={true}
                   keyExtractor={(item) => item}
                   renderItem={renderTagItem}
                />
                </View>

                
            </View>

            
            <View style={styles.discount}>
                <Image style={styles.image} source={ require("../../assets/images/Discount.png")} ></Image>
                <Text style={styles.discountText}> {randomIntFromInterval(1,100)} %</Text>
            </View>
        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({

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
    titleContainer:{
        marginLeft: 10,
        marginTop: 5

    },
    txtContainer: {
        flexDirection: 'row'
    },
    title:{
        fontSize: 16,
        fontFamily: 'medium',
        color: COLORS.black
    },
    tags:{
        right: 10,
        marginHorizontal: 10, 
        backgroundColor: COLORS.primary,
        borderRadius: 8
    },
    discount:{
        flexDirection: 'row',
        justifyContent:'center',
        paddingVertical:5,
        backgroundColor: COLORS.gold,
        borderRadius: 8
    },
    discountText:{
        fontSize: 24,
        fontFamily: 'medium',
        color: COLORS.red,
        paddingVertical:5
    },
    image:{
        width: 200, 
        height: 50,
    }
});
  