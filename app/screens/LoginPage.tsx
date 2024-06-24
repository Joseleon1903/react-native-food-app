import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Button,
} from "react-native";
import React, { useState, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES, WINDOW } from "../constants/theme";
import { LoginContext } from "../context/LoginContext";
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import { LoginContextType } from "../context/type/LoginContextType";
import { AppUser } from "../types/AppUser";
import { Formik } from "formik";
import * as yup from 'yup'
import { RootStackParamList } from "../navigation/types/RootStackParamList";
import { useNavigation } from "@react-navigation/native";
import { OnlineServiceContext } from "../context/OnlineServiceContext";
import { useLoginHook } from "../hook/useLoginHook";
import { OnlineServiceContextType } from "../context/type/OnlineServiceContextType";
import { MockProfile } from "../utils/TypesUtils";

type Props = NativeStackScreenProps<RootStackParamList, "SignUpPage", "SignUpNav">;


export default function  LoginPage ({ route, navigation }: Props) {

  const navigationBotton = useNavigation();

  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);
  const { profileObj, setProfileObj, login, setLogin} = useContext(LoginContext) as LoginContextType;

  const {  onlineService, setOnlineService} = useContext(OnlineServiceContext) as OnlineServiceContextType;

  const [appUser, setAppUser] = useState<AppUser>({id: 0, email:"", password:""});

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

  const loginFunc = async (values:AppUser) => {
    setLoader(true);
    const data = values;

    console.log("data email: "+ data.email);
    console.log("data password: "+ data.password);

    if(onlineService.isOnlineApi){

      useLoginHook(onlineService.baseApi, data.email, data.password ).then((response) => {
        console.log(response);
        setProfileObj(response);
        setLogin(true);
        navigationBotton.navigate("Home");
      }).catch((error) =>{
        console.log(error);
        alert("Error: "+ error);
      });
    }else{
      console.log("api no esta arriba seteand usuario mock ");
      setProfileObj(MockProfile);
      setLogin(true);
      navigationBotton.navigate("Home");
    }

   


  };
  
  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>

     <View>

          <View style={styles.cover}>
            <Image style={styles.image} source={ require("../../assets/images/initial_image_app.png")} ></Image>
          </View>

          <Text style={styles.titleLogin}>Foodly Family</Text>
      </View>

      <View style={styles.registrationForm}>

      <Formik
          initialValues={appUser}
          validationSchema={loginValidationSchema }
          onSubmit={(values) => loginFunc(values)}
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
              <View style={styles.wrapper}>
                <Text style={styles.label}>Email</Text>
                <View
                  style={styles.inputWrapper}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={COLORS.gray}
                    style={styles.iconStyle}
                  />

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


              <TouchableOpacity style={styles.loginBtn} onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
                >
                  <Text style={styles.loginTxt}> LOGIN </Text>

              </TouchableOpacity>

              <Text
                style={styles.registration}
                onPress={() => {
                  navigation.navigate("SignUpNav", { screen: "SignUpPage"});
                }}
              >
                {" "}
                Register{" "}
              </Text>
            </View>
          )}
        </Formik>



      </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
      backgroundColor: COLORS.lightWhite,
      height: WINDOW.Height
  },
  registrationForm:{
    marginBottom: 20,
    marginHorizontal:20
  },
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
    marginVertical: 20,
    marginHorizontal: 60,
    fontFamily: "bold",
    fontSize: 35,
    color: COLORS.primary
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

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})