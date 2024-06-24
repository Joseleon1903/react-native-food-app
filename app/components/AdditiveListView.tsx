import { FlatList, StyleSheet,Text, View } from 'react-native'
import { COLORS, WINDOW } from '../constants/theme';
import Additives from '../types/Additives';

type CounterProps = {
    additives?: Additives[]
};

export default function AdditiveListView({additives} : CounterProps) {

    const renderAdditive = ({ item }: { item: Additives }) => {
        return  <Text style={styles.text}>{item.title}</Text>  
      };

    return (

        <View style={styles.container}>

            <FlatList
                data={additives}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.title}
                scrollEnabled={false}
                renderItem={renderAdditive}
                />

           

        </View>
    )

}
const styles = StyleSheet.create({
    
    container: {
        marginEnd:5,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 5
      },
      text:{
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.primary,
        margin: 1
      }
});
  