import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, Button } from "react-native-elements";
import { Appbar, Searchbar } from "react-native-paper";
import { Platform } from "react-native";
import instance from "../utils/http";
import Card from "./card";
import Dialog from "./search";
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical";
const Drawer = ({ navigation }) => {
  const [data, setData] = useState();
  useEffect(() => {
    instance
      .get(`/allthenews?search=Coronavirus&categories=ULTIMAS_NOTICIAS`)
      .then((result) => {
        setData(result.data);
      });
  });
  const handleLogout = async () => {
    await localStorage.clear();
    await navigation.navigate("login");
  };
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Coronavirus Hoy"  />
        <Appbar.Action
          icon="magnify"
          onPress={() => navigation.navigate("search")}
        />
        <Appbar.Action icon="logout" onPress={() => handleLogout()} />
      </Appbar.Header>
      {data && <Card news={data} />}
    </View>
  );
};
export default Drawer;
