import { useContext } from 'react';
import { StyleSheet,Text, View , Image} from 'react-native'
import { RestaurantContext } from '../../context/RestaurantContext';
import { RestaurantContextType } from '../../context/type/RestaurantContextType';
import { COLORS, WINDOW } from '../../constants/theme';
import Divider from '../../components/Divider';
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FormatTextLength } from '../../utils/TypesUtils';

export default function DirectionTab() {

    const {restaurantObj , setRestaurantObj} = useContext(RestaurantContext) as RestaurantContextType;
 
    return (
        <View>

            <View style={styles.mapContainer}>

                <Image source={{uri: restaurantObj.coords?.urlLocation}} style={styles.map} />
            </View>

            <View style={styles.titleContainer}>

                <Divider />
                <Text style={styles.title}>Adictional Information</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <MaterialIcons name="title" size={20} color={COLORS.primary} />
                        <Text style={[styles.medium, {color: COLORS.gray}]}>Merchant</Text>
                    </View>
                    <Text style={[styles.small, {fontFamily: 'regular'}]}>{restaurantObj.coords?.title}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>

                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <Entypo name="address" size={20} color={COLORS.primary} />
                        <Text style={[styles.medium, {color: COLORS.gray}]}>Address</Text>
                    </View>

                    <Text style={[styles.small, {fontFamily: 'regular'}]}> {FormatTextLength(restaurantObj.coords?.address, 38)}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <MaterialCommunityIcons name="longitude" size={20} color={COLORS.primary} />
                        <Text style={[styles.medium, {color: COLORS.gray}]}>Latitude</Text>
                    </View>
                    <Text style={[styles.small, {fontFamily: 'regular'}]}>{restaurantObj.coords?.latitude} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                        <MaterialCommunityIcons name="longitude" size={20} color={COLORS.primary} />
                        <Text style={[styles.medium, {color: COLORS.gray}]}>Longitude</Text>
                    </View>
                    <Text style={[styles.small, {fontFamily: 'regular'}]}>{restaurantObj.coords?.longitude}</Text>
                </View>

            </View>          
    
        </View>

        
    )

}
const styles = StyleSheet.create({

    mapContainer: {
        marginHorizontal: 5,
        marginVertical: 8,
        height: 200, 
        borderRadius: 12,
        borderColor: COLORS.gray2,
        borderWidth: 1
    },
    map:{
        width: '100%',
        height: '100%',
        borderRadius:12

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
    medium:{
        fontSize: 16,
        fontStyle: 'italic',
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
  