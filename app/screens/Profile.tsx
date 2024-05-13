import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { LoginContext } from "../context/LoginContext";

import { AntDesign } from "@expo/vector-icons";

import NetworkImage from "../components/NetworkImage";
import ProfileTile from "../components/ProfileTile";
import RegistrationTile from "../components/RegistrationTile";
import { LoginContextType } from "../context/type/LoginContextType";

export default function Profile(){


  const {  profileObj, setProfileObj, login, setLogin} = useContext(LoginContext) as LoginContextType;

  console.log("profileId : "+ profileObj.id);
  console.log("is loggin L "+ login);

  const [user, setUser] = useState(null)

  //  const { user, isProfileLoading, error, refetch } = fetchProfile();
  const profile =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/b5065bb8-4c6b-4eac-a0ce-86ab0f597b1e-vinci_04.jpg";
  const bkImg =
    "https://d326fntlu7tb1e.cloudfront.net/uploads/ab6356de-429c-45a1-b403-d16f7c20a0bc-bkImg-min.png";
  // if (isProfileLoading) {
  //   return <LoadingScreen />;
  // }

  const logout  =() =>{
    console.log("entering in logout");
    setLogin(false);
    
  }

  return (
    <View>
      <View style={{ backgroundColor: COLORS.primary, height: SIZES.height }}>
        <View
          style={{
            backgroundColor: COLORS.offwhite,
            height: SIZES.height - 80,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}
        >
          <Image
            source={{ uri: bkImg }}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity: 0.7,
              },
            ]}
          />
          <View style={styles.profile}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
             <NetworkImage
                data={profileObj.profileUrl}
                width={45}
                height={45}
                radius={99}
              />
              <View style={{ marginLeft: 10, marginTop: 3 }}>
                <Text style={styles.text}>
                   {profileObj.username} 
                </Text>
                <Text style={styles.email}>
                {profileObj.email} 
                </Text>
              </View>
            </View>

            <TouchableOpacity onPress={logout}>
              <AntDesign name="logout" size={24} color="red" />
            </TouchableOpacity>
            
          </View>

          <RegistrationTile
            heading={"Register a restaurant"}
            desc={
              "Join our community and showcase your culinary delights to a wider audience."
            }
          />

          <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile title={"Orders"} icon={"fast-food-outline"} font={1} />
            <ProfileTile title={"Places"} icon={"heart"} font={2} />
            <ProfileTile title={"Payment History"} icon={"creditcard"} />
          </View>

          <View
            style={{
              height: 45,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile title={"Coupons"} icon={"tago"} />
          </View>

          <RegistrationTile
            heading={"Join the courier team"}
            desc={
              "Embark on a journey, deliver joy, and earn on your own schedule."
            }
          />

          <View
            style={{
              height: 140,
              backgroundColor: COLORS.lightWhite,
              margin: 10,
              borderRadius: 12,
            }}
          >
            <ProfileTile
              title={"Shipping Address"}
              icon={"location-outline"}
              font={1}
            />
            <ProfileTile title={"Services Center"} icon={"customerservice"} />
            <ProfileTile title={"Settings"} icon={"setting"} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontFamily: "medium",
    color: COLORS.black,
  },
  email: {
    marginLeft: 10,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 60,
  },
});
