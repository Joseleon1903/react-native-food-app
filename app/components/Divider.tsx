import { StyleSheet,Text, View } from 'react-native'
import { COLORS, WINDOW } from '../constants/theme';


export default function Divider() {


    return (
        <View style={styles.divider} />
    )

}
const styles = StyleSheet.create({

    divider: {
        borderColor: COLORS.gray2,
        opacity: 0.7,
        width: WINDOW.Width -40,
        borderWidth: 0.3,
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 7
        
    }
  });
  