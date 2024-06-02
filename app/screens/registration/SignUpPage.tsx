import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StyleSheet
} from "react-native";
import React, { useState, useRef, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {NativeStackHeaderProps, NativeStackScreenProps} from '@react-navigation/native-stack'
import axios from 'axios';
import { RootStackParamList } from "../../navigation/types/RootStackParamList";
import { COLORS, SIZES, WINDOW } from "../../constants/theme";
import Profile from "../../types/Profile";
import { Formik } from "formik";
import { DefaultAddress, DefaultUserType, EmptyProfile } from "../../utils/TypesUtils";
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker'
import BackBtn from "../../components/BackBtn";



type Props = NativeStackScreenProps<RootStackParamList, "SignUpPage", "SignUpNav">;


export default function SignUpPage ({navigation} : Props) {

  const [profile, setProfile] = useState<Profile>(EmptyProfile);

  const [obsecureText, setObsecureText] = useState(true);

  const goBack = () =>{navigation.goBack();}

  const onChangeCountry = () => {
    console.log("change address");


  };


  const inValidForm = () => {
    Alert.alert("Invalid Form", "Please provide all required fields", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      }
    ]);
  };

  return (

    <ScrollView style={{ backgroundColor: COLORS.white }}>

    <View>
       <View>

        <View style={styles.cover}>
          <Image style={styles.image} source={ require("../../../assets/images/initial_image_app.png")} ></Image>
        </View>

        <BackBtn onPress={goBack} /> 


        <Text style={styles.titleLogin}>Registration</Text>
       </View>
    </View>

    <View style={styles.registrationForm}>

    <Formik
          initialValues={profile}
          validationSchema={registrationValidationSchema }
          onSubmit={(values) => {console.log("send registration");}}
        >
          {({
            handleChange,
            handleBlur,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
          }) => (
            <View>

              {/* email input  */}
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View>
                  <MaterialCommunityIcons name="email-outline" size={20} color={COLORS.gray} style={styles.iconStyle}/>

                  <TextInput
                    placeholder="Enter email"
                    onFocus={() => {
                      setFieldTouched("email");
                    }}
                    onBlur={() => {
                      setFieldTouched("email", true);
                    }}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorMessage}>{errors.email}</Text>
                )}
              </View>

              <View>
                <Picker
                      enabled={true}
                      mode="dropdown"
                      placeholder="Select City"
                      onValueChange={handleChange('address.country')}
                      selectedValue={values.address.country}
                >
                    {DefaultAddress.map((item) => {
                      return (
                          <Picker.Item
                          label={item.country}
                          value={item.country}
                          key={item.country} />
                      );
                    })}
                  </Picker>

              </View>

              <View>
                <Picker
                      enabled={true}
                      mode="dropdown"
                      placeholder="Select City"
                      onValueChange={handleChange('userType')}
                      selectedValue={values.userType}
                >
                    {DefaultUserType.map((item) => {
                      return (
                          <Picker.Item
                          label={item}
                          value={item}
                          key={item} />
                      );
                    })}
                  </Picker>

              </View>

              <View style={styles.wrapper}>
                <Text style={styles.label}>Password</Text>
                <View
                  style={styles.inputWrapper} //validate change fot typescript dynamically color change for password
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

                  <TextInput
                          placeholder="Password"
                          onFocus={() => {
                            setFieldTouched("password");
                          }}
                          style={{ flex: 1 }}
                          onChangeText={handleChange('password')}
                          onBlur={() => {
                            setFieldTouched("password", true);
                          }}
                          value={values.password}
                          autoCapitalize="none"
                          autoCorrect={false}
                          secureTextEntry={obsecureText}
                        />

                  <TouchableOpacity
                    onPress={() => {
                      setObsecureText(!obsecureText);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={obsecureText ? "eye-off-outline" : "eye-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>

              
             

              <TouchableOpacity style={styles.loginBtn}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
                >
                  <Text style={styles.loginTxt}> SUBMIT </Text>

              </TouchableOpacity>

            </View>
          )}
        </Formik>


    </View>

    </ScrollView>
    
  );
};


const styles = StyleSheet.create({
  image: {
    width: WINDOW.Width/2, 
    height: WINDOW.Height/4,
    borderRadius: 30
  },
  cover: {
    flexDirection:"row",
    justifyContent: "center",
    marginTop: 45
  
  },
  titleLogin: {
    textAlign: "center",
    marginVertical: 20,
    marginHorizontal: 60,
    fontFamily: "bold",
    fontSize: 35,
    color: COLORS.primary
  },
  registrationForm:{
    marginBottom: 20,
    marginHorizontal:20
  },
  wrapper: {
    marginBottom: 20,
 },
 label: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right"
 },
 inputWrapper:{
    borderColor: COLORS.black,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: "center"

 },
 iconStyle: {
    marginRight: 10
 },
 errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall
 },
 registration: {
    marginTop: 20,
    textAlign: "center",
 },
 loginBtn: {
  marginVertical: 20,
  marginHorizontal: 10,
  fontFamily: "bold",
  fontSize: 35,
  color: COLORS.white,
  backgroundColor:  COLORS.primary,
  borderRadius:30
 },
 loginTxt: {
  marginVertical:5,
  marginHorizontal: 60,
  fontFamily: "bold",
  fontSize: 20,
  textAlign:"center",
  color: COLORS.white,
 }

});

const registrationValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  country: yup
    .string()
    .min(8, ({ min }) => `Select valid country`)
    .required('Country is required'),
})