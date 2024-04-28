import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from './page.style'
import { PressableText } from "../components/PressableText";

export default function Home() {
  
  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>



        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});
