import { StyleSheet,Text, View } from 'react-native'
import { COLORS, WINDOW } from '../constants/theme';


export default function HomeHeaderLogout() {


    return (
        <View style={styles.header_row}>

           <Text style={styles.titleLogin}>Foodly Family</Text>

        </View>
    )

}
const styles = StyleSheet.create({
    header_row:{
        height: 35,
        marginBottom: 5,
        backgroundColor: COLORS.primary
       
    },
    titleLogin: {
        textAlign:'center',
        paddingVertical:5,
        fontFamily: "bold",
        fontSize: 15,
        color: COLORS.white
     },
});
  