import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import styles from "./login.style";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../context/LoginContext";
import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import BackBtn from "../components/BackBtn";
import axios from 'axios';


export default function  LoginPage ({navigation} : NativeStackHeaderProps) {
  const animation = useRef(null);
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(false);
  // const {login, setLogin} = useContext(LoginContext)

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

  // const login = async (values) => {
  //   setLoader(true);
  //   try {
  //     await firebase
  //       .auth()
  //       .signInWithEmailAndPassword(values.email, values.password).then(() => navigation.navigate('home')).catch((error) => {
  //         Alert.alert("Error Login", error.message, [
  //           {
  //             text: "Back",
  //             onPress: () => {
  //               setLoader(false);
  //             },
  //           },
  //           {
  //             text: "Continue",
  //             onPress: () => {},
  //           },
  //           { defaultIndex: 1 },
  //         ]);
  //       });
  //   } catch (error) {
  //     Alert.alert("Error Login", error.message, [
  //       {
  //         text: "Back",
  //         onPress: () => {
  //           setLoader(false);
  //         },
  //       },
  //       {
  //         text: "Continue",
  //         onPress: () => {},
  //       },
  //       { defaultIndex: 1 },
  //     ]);
  //   }
  // };

  const loginFunc = async (values:any) => {
    setLoader(true);

    try {
      const endpoint = "http://localhost:6002/login";
      const data = values;

      console.log(data);

      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        // setLogin(true);

        console.log(response.data);

        await AsyncStorage.setItem("id", JSON.stringify(response.data._id));
        await AsyncStorage.setItem("token", JSON.stringify(response.data.userToken));

      } else {
        // setLogin(false);

        Alert.alert("Error Logging in ", "Please provide valid credentials ", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          }
        ]);
      }
    } catch (error) {
      // setLogin(false);
      Alert.alert(
        "Error ",
        "Oops, Error logging in try again with correct credentials",
        [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          }
        ]
      );
    } finally {
      setLoader(false);
    }
  };
  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <BackBtn onPress={() => navigation.goBack()} />
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: SIZES.height / 3.2 }}
          source={require("../../assets/anime/delivery.json")}
        />

        <Text style={styles.titleLogin}>Foodly Family</Text>

        {/* <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
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
                  style={styles.inputWrapper(
                    touched.email ? COLORS.secondary : COLORS.offwhite
                  )}
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
                      setFieldTouched("email", "");
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
                    secureTextEntry={obsecureText}
                    placeholder="Password"
                    onFocus={() => {
                      setFieldTouched("password");
                    }}
                    onBlur={() => {
                      setFieldTouched("password", "");
                    }}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{ flex: 1 }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setObsecureText(!obsecureText);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={obsecureText ? "eye-outline" : "eye-off-outline"}
                      size={18}
                    />
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorMessage}>{errors.password}</Text>
                )}
              </View>

              <Button
                loader={loader}
                title={"L O G I N"}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
              />

              <Text
                style={styles.registration}
                onPress={() => {
                  navigation.navigate("signUp");
                }}
              >
                {" "}
                Register{" "}
              </Text>
            </View>
          )}
        </Formik> */}
      </View>
    </ScrollView>
  );
};