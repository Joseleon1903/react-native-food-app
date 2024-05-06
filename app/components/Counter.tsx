import { StyleSheet,Text, View } from 'react-native'
import { COLORS, WINDOW } from '../constants/theme';
import { AntDesign } from '@expo/vector-icons';


type CounterProps = {
    counter: number
    setCounter?: any;
};

export default function Counter({counter, setCounter} : CounterProps) {

    const increment = ()=>{
        setCounter(counter+1);
    }

    const decrement = ()=>{
        if(counter > 1){
            setCounter(counter-1);
        }
    }

    return (
        <View style={styles.container}>

            <AntDesign name='minuscircleo' size={26} color={COLORS.primary} onPress={decrement}/>
            <Text style={styles.counterTxt}>   {counter}   </Text>
            <AntDesign name='pluscircleo' size={26} color={COLORS.primary} onPress={increment}/>

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    counterTxt:{
        fontFamily: 'regular',
        fontSize: 18,
        marginTop: 1

    }

    
});
  