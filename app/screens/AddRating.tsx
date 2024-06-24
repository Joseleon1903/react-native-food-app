import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ReusableHeader from "../components/ReusableHeader";
 import { RatingInput } from "react-native-stock-star-rating";
import { COLORS, WINDOW } from "../constants/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types/RootStackParamList";
import { OnlineServiceContext } from "../context/OnlineServiceContext";
import { OnlineServiceContextType } from "../context/type/OnlineServiceContextType";
import Restaurant from "../types/Restaurant";
import { putRatingHook } from "../hook/useRatingHook";
import NetworkImage from "../components/NetworkImage";
type Props = NativeStackScreenProps<RootStackParamList, "AddRating", "FoodNav">;


export default function AddRating({ route, navigation }: Props) {

  const {  onlineService, setOnlineService} = useContext(OnlineServiceContext) as OnlineServiceContextType;

  const [rating, setRating] = useState(0);

  const restaurantInput = route.params.restaurant as Restaurant

  const handlerSubmitRating = () =>{

    if(onlineService.isInternetConnected && onlineService.isOnlineApi){

      console.log(" online service connected");
      putRatingHook(onlineService.baseApi, restaurantInput.id, rating).then((response) => {
        if(response){
          restaurantInput.rating = response?.rating;
        }
       }).catch((error) =>{
         console.log(error)
       }
     );
    }

    navigation.goBack();

  }

  return (
    <SafeAreaView style={{ height: WINDOW.Height }}>
      <Image
        source={{
          uri: restaurantInput.imageUrl,
        }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={30}
      />
      <ReusableHeader title={"Add Ratings"} urlImage={restaurantInput.imageUrl}  />

      <View style={styles.container}>
        <View style={styles.ratingBox}>
          <View style={styles.image}>

          <NetworkImage
            data={restaurantInput.imageUrl}
            mode={"cover"}
            width={70}
            height={70}
            radius={99}
          />
          
          </View>

          <View style={{ paddingTop: 40 }}>
             <RatingInput
              rating={rating}
              color={COLORS.yellow}
              setRating={setRating}
              size={50}
              maxStars={5}
              bordered={false}
            /> 

            <Text
              style={[
                styles.small,
                { paddingLeft: 80, marginTop: 10, color: COLORS.black },
              ]}
            >
              TAP TO RATE
            </Text>
          </View>
        </View>

        <View style={{ height: 50 }} />

        <TouchableOpacity onPress={handlerSubmitRating}
          style={{
            width: "100%",
            height: 50,
            backgroundColor: COLORS.primary,
            borderRadius: 12,
            borderColor: COLORS.lightWhite,
            borderWidth: 0.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.small}>SUBMIT RATING</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
  },
  ratingBox: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 20,
    height: 140,
    backgroundColor: "#c2f0ff59",
    borderRadius: 12,
  },

  image: {
    position: "absolute",
    zIndex: 999,
    top: -30,
  },
  small: {
    fontSize: 16,
    fontFamily: "medium",
    color: COLORS.lightWhite,
  },
});
