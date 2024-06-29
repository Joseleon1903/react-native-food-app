import { StyleSheet,Text, TouchableOpacity, View } from 'react-native'
import { COLORS} from '../constants/theme';
import CartItem from '../types/CartItem';
import NetworkImage from './NetworkImage';
import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type CartItemComponentProps = {
    cartItem: CartItem
    onDelete?: () => void;
};

export default function CartItemComponent({ cartItem, onDelete }: CartItemComponentProps) {

    const [imageUrl, setImageUrl] = useState<string>("https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg");


    useEffect(()=>{
        if(cartItem.productId){
            setImageUrl(cartItem.productId?.imageUrl[0]);
        }

    }, [])


    return (
        <View style={[styles.wrapper , styles.shadowStyle]}>

           <View style={styles.innerContainer}>

            <NetworkImage data={imageUrl} height={85} width={75} radius={15} />

            <View>

            <Text style={styles.title}>{cartItem.productId?.title}</Text>

                <View style={{flexDirection: 'row'}}>

                    <View style={{flexDirection: 'column' }}>
                        <View style={{flex: 1, justifyContent:'center', alignItems: 'center' }}>
                            <Text style={styles.titleColumn}>Quantity</Text>
                            <Text style={styles.contentColumn}>{cartItem.quantity}</Text>
                        </View>
                        
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <View style={{flex: 1, justifyContent:'center', alignItems: 'center' }}>
                            <Text style={styles.titleColumn}>Additives</Text>
                            <Text style={styles.contentColumn}>{cartItem.additives?.length}</Text>                            
                        </View>
                    </View>

                    <View style={{flexDirection: 'column'}}>
                        <View style={{flex: 1, justifyContent:'center', alignItems: 'center' }}>
                            <Text style={styles.titleColumn} >Total Price</Text>
                            <Text style={styles.contentColumn}>$ {cartItem.totalPrice.toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent:'center', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity  onPress={onDelete} style={styles.deleteBtn}>
                        <MaterialIcons name="delete-outline" size={35} color={COLORS.lightWhite} />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>

           </View>


        </View>
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
    innerContainer: {
        flexDirection: 'row'
    },
    title:{
        marginStart: 5,
        fontSize: 16,
        fontFamily: 'medium',
        color: COLORS.black
    },
    titleColumn:{
        fontSize: 12,
        fontFamily: 'medium',
        color: COLORS.gray,
        marginHorizontal: 5
    },
    contentColumn:{
        fontSize: 18,
        fontFamily:"bold",
        color: COLORS.black, 
    },
    deleteBtn:{
        width: 40,
        height: 40,
        backgroundColor: COLORS.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary1,
        borderRadius: 5,
    }
});
  