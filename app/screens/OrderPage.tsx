import { StyleSheet,Text, View } from 'react-native'
import { RootStackParamList } from '../navigation/types/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList>;

export default function OrderPage({ route, navigation }: Props) {


    return (
        <View>

            <Text>OrderPage</Text>


        </View>
    )

}
const styles = StyleSheet.create({
    
});
  