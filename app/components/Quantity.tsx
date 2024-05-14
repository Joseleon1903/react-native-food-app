import { StyleSheet,Text, View } from 'react-native'
import { COLORS, WINDOW } from '../constants/theme';

type CounterProps = {
    counter: number
};

export default function Quantity({counter} : CounterProps) {


    return (

        <View style={{flexDirection: 'row', justifyContent:'space-between' , marginTop:10}}>

            <Text style={styles.quantityTxt}>Quantity</Text>

            <View style={styles.circle}>
              <Text style={styles.number}>{counter} </Text>
            </View>

        </View>
    )

}
const styles = StyleSheet.create({
    quantityTxt:{
        fontSize: 14,
        fontFamily: 'bold',
        color: COLORS.black,
    },

    circle: {
        width: 35,
        height: 20,
        borderRadius: 35,
        backgroundColor: COLORS.primary1,
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: 10
      },
      number: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.primary,
      },

    
});
  