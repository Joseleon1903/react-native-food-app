import {TouchableOpacity,  Pressable, StyleSheet,Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

type HeadingProps = {
    heading :  string,
    onPress?: () => void;

};

export default function Heading({heading, onPress}: HeadingProps) {
    return (
      <View style={styles.headingTxt}>
        <Text  style={styles.textInside}>{heading}</Text>

        <TouchableOpacity onPress={onPress}>
            <AntDesign name="isv" size={24} color={COLORS.secondary}  />
        </TouchableOpacity>
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({

    headingTxt: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 7,
        justifyContent: 'space-between',
        marginRight: 16
    },
    textInside:{
        marginLeft: 16,
        fontSize: 18,
        fontFamily: 'bold'
    }
  });
  