import { StyleSheet,Text, View } from 'react-native'
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function OrderPage({ route, navigation }: Props) {

    const orderItem = route.params.OrderPage.title as string



    return (
        <View style={styles.container}>

            <Text>OrderPage</Text>

            <Text>{orderItem}</Text>



        </View>
    )

}
const styles = StyleSheet.create({

    container:{
        marginTop:40,
    }
    
});
  