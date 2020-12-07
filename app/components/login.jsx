import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import api from "./utils/api";
import Icon from "react-native-vector-icons/FontAwesome";
const styles = {
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
  info: {
    padding: 50,
    textAlign: "center",
  },
  button: {
    width: 240,
    height: 48,
  },
};
const Login = ({ navigation }) => {
  //   const { success, error, loading, history } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (response) => {
    const values = {
      email,
      password,
    };
    return api
      .post("/login", values)
      .then((result) => {
        if (result.data.token) {
          const token = result.data.token.replace(/[ '"]+/g, " ");
          localStorage.setItem("token", token);
        }
        alert("Usuario " + email + " inicio  sesión con exito ");
        navigation.navigate("home");
      })
      .catch((err) => {
        alert("El usuario " + email + " no inicio   sesión  " + err);
      });
  };
  return (
    <View style={styles.wrapper}>
      <Text h4 style={styles.info}>
        Sing out
      </Text>
      <Icon name="sign-in" size={30} color="#900" />
      <Input placeholder="Email" onChangeText={(value) => setEmail(value)} />
      <Input
        placeholder="password"
        // style={styles}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
      />
      <View>
        {" "}
        <Button
          style={styles.button}
          title="Iniciar Sesión"
          onPress={handleSubmit}
        />
      </View>
      <View>
        {" "}
        <Button
          style={styles.button}
          title="Crear Cuenta"
          onPress={() => navigation.navigate("register")}
        />
      </View>
    </View>
  );
};
export default Login;
