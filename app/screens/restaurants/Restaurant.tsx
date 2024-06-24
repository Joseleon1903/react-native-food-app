import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet,Text, View } from 'react-native'
import { RootStackParamList } from '../../navigation/types/RootStackParamList';
import RestaurantPages from '../../navigation/RestaurantPages';
import NetworkImage from '../../components/NetworkImage';
import { COLORS, SIZES, WINDOW } from '../../constants/theme';
import RestaurantType from '../../types/Restaurant';
import BackBtn from '../../components/BackBtn';
import ShareBtn from '../../components/ShareBtn';
import { RatingInput } from 'react-native-stock-star-rating';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import CustomModal, { ModalType, ConfirmationType } from '../../components/CustomModal';


type Props = NativeStackScreenProps<RootStackParamList, "Restaurant", "FoodNav">;

export default function Restaurant({ route, navigation }: Props) {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const data = route.params.restaurant as RestaurantType

    const goBack = () =>{navigation.goBack();}

    const handlerRating =() =>{
        navigation.navigate("FoodNav", { screen: "AddRating", params: { restaurant: data}});
    }
    
    return (
        <View>

            <CustomModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} modalType={ModalType.warning}
                    title='functionality not available' content="This functionality is not available in this version" confirmationType={ConfirmationType.close} />

            <View>

                <BackBtn onPress={goBack} /> 

                <ShareBtn onPress={ () => setIsModalVisible(true)} />


                <NetworkImage data={data.imageUrl} height={WINDOW.Height/3.4} width={WINDOW.Width} radius={0}></NetworkImage>


                    <View style={styles.rating}>

                        <View style={styles.innerRating}>
                            <RatingInput 
                                rating={data.rating}
                                size={20}
                                maxStars={5}
                                setRating={data.rating}
                                bordered={false}
                                color={COLORS.yellow}
                            />

                            <TouchableOpacity style={styles.ratingBtn} onPress={handlerRating}>
                                <Text style={styles.titleBtn}>Rate this restaurant </Text>
                            </TouchableOpacity>

                        </View>


                    </View>


            </View>

           
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{data.title}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.small, {color: COLORS.gray}]}>Time and Delivery</Text>
                    <Text style={[styles.small, {fontFamily: 'regular'}]}>{data.time}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.small, {color: COLORS.gray}]}>Owner of the restaurant</Text>
                    <Text style={[styles.small, {fontFamily: 'regular'}]}>{data.owner}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.small, {color: COLORS.gray}]}>Phone</Text>
                    <Text style={[styles.small, {fontFamily: 'regular'}]}>{data.code}</Text>
                </View>

            </View>


            <View style={{height: 600}}>

                <RestaurantPages></RestaurantPages>

                
            </View> 


        </View>
    )

}
const styles = StyleSheet.create({

    rating:{
        height:50,
        justifyContent: 'center',
        width: '100%',
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        borderRadius: 18
    },
    innerRating:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal: 2
    },
    ratingBtn:{
        borderColor: COLORS.lightWhite,
        borderWidth: 1,
        borderRadius: 12,
        padding: 6
    },
    titleBtn:{
        fontSize: 14,
        fontFamily:'regular',
        color: COLORS.lightWhite
    },
    titleContainer:{
        marginTop: 8,
        marginHorizontal: 8,
        marginBottom: 8
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
    }
    
});
  