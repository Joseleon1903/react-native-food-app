import { StyleSheet,Text, View } from 'react-native'
import { COLORS, WINDOW } from '../constants/theme';


export default function EmptyCartAdvice() {


    return (
        <View style={styles.container}>

            <Text style={styles.title}>There are no items in the cart</Text>


        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        marginTop:10,
        marginLeft: 10,
        marginRight: 5,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        borderRadius: 5,
        padding:5,
      },
      title:{
        marginVertical: 10,
        marginHorizontal: 15,
        fontFamily: "bold",
        fontSize: 22,
        color: COLORS.primary
      }
});
  