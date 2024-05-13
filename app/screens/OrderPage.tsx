import { StyleSheet,Text, View } from 'react-native'
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { CartCountContext } from '../context/CartCountContext';
import { CartCountContextType } from '../context/type/CartCountContextType';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function OrderPage({ route, navigation }: Props) {

    const orderItem = route.params.OrderPage.title as string

    const { cartCount, setCartCount, cartItem } = useContext(CartCountContext) as CartCountContextType;


    return (
        <View style={styles.container}>

            <Text>OrderPage</Text>

            <Text>{orderItem}</Text>
            <Text>cart count {cartCount}</Text>


        </View>
    )

}
const styles = StyleSheet.create({

    container:{
        marginTop:40,
    }
    
});
  