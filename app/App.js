import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Drawer from "./components/form/drawer";
import Login from "./components/login";
import AppNavigator from "./components/AppNavigator";
export default function App() {
  return <AppNavigator theme="light" />;
}

const styles = StyleSheet.create({
  container: {},
});
