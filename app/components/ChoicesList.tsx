import {
  FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
  } from "react-native";
  import React, { useState } from "react";  
import { COLORS } from "../constants/theme";

interface Choice{
  id : number,
  name: string,
  value: string
}

type ChoicesListProps= {
  setSelectedChoice?: any;
  setSelectedSection?:any;
};

export default function ChoicesList({setSelectedChoice, setSelectedSection} : ChoicesListProps){


  const [selected, setSelected] = useState<any>(null);

  const choicesList =[
    {
      id: 1,
      name: "Pick up",
      value:"pickup"
    },
    {
      id: 2,
      name: "4 Star",
      value:"4star"
    },
    {
      id: 3,
      name: "3 Star",
      value:"3Star"
    },
    {
      id: 4,
      name: "Under 30 Min",
      value:"Under30Min"
    },
    {
      id: 5,
      name: "Recommended",
      value:"recommended"
    }
  ];

  const handlePress =(item : Choice)=>{
    if(selected == item.value){
      setSelected(null);
      setSelectedChoice(null);
      setSelectedSection(null);
    }else{
      setSelected(item.value);
      setSelectedChoice(item.value);
      setSelectedSection('restaurants');
    }
  }

    const renderItem = ({ item }: { item: Choice }) => {
      return <TouchableOpacity style={styles(selected, item).item}  onPress={ ()=> handlePress(item)}>
                  <Text style={styles(selected, item).itemText} >{item.name}</Text>
              </TouchableOpacity>;
      }

    return (

      <View>

          <Text style={styles(selected).choseTxt}>Pick Restaurants</Text>

          <FlatList
          data={choicesList as Choice[]}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          >
          </FlatList>

      </View>

        
        
        )
      
  }

  const styles = (selected : any , item? : Choice) => StyleSheet.create({
    choseTxt: {
        marginLeft: 16,
        fontSize: 18,
        fontFamily:'bold'
    },
    item:{
      backgroundColor: selected == item?.value ? COLORS.secondary : COLORS.lightWhite,
      height: 40,
      borderRadius: 12,
      marginHorizontal: 8,
      justifyContent: 'center'
    },
    itemText: {
      marginHorizontal: 10,
      fontFamily: 'regular',
      fontSize:13,
      color: selected == item?.value ? COLORS.lightWhite : COLORS.gray
    }
  });

