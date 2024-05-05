import { TouchableOpacity, StyleSheet,Text, View } from 'react-native'
import { COLORS, WINDOW } from '../constants/theme';
import NetworkImage from './NetworkImage';
import Food from '../types/Food';

type FoodComponentProps = {
    item: Food
    onPress?: () => void;

};

export default function FoodComponent({item,  onPress }: FoodComponentProps) {


    return (
        <TouchableOpacity style={styles.wrapper} onPress={onPress}>
            <NetworkImage
                data={item.imageUrl[0]}
                width={WINDOW.Width - 60}
                height={WINDOW.Height / 5.8}
                radius={16}
                mode={'cover'}
                />

            <Text style={styles.heading}>{item.title}</Text>
            <Text style={styles.small}>{item.time} - Delivery Time</Text>
        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({

    wrapper: {
        marginRight: 15,
        backgroundColor: COLORS.lightWhite,
        padding: 8,
        borderRadius: 16
    },
    heading:{
        fontSize: 14,
        fontFamily:'regular',
        color: COLORS.gray
    },
    insider:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    small:{
        fontSize: 14,
        fontFamily:'regular',
        color: COLORS.gray
    }
  });
  