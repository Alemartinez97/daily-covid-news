import * as React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import instance from "../utils/http";
import Card from "./card";
const styles = {
  wrapper: {
    flex: 1,
    alignItems: "center",
    margin: 15,
  },
  button: {
    width: 240,
    height: 48,
  },
};
const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [data, setData] = React.useState();
  const handleSubmit = (query) => {
    return instance
      .get(`/newsRn?search=${searchQuery}`)
      .then((result) => {
        setData(result.data.dataSearch);
        alert("La Busqueda fue realizada con exito");
      })
      .catch((response) => {
        alert("Error, La busqueda no se realizo. " + response);
        console.error("Mutation error:", response);
      });
  };
  return (
    <View style={styles.wrapper}>
      {" "}
      <Input
        placeholder="Search"
        onChangeText={(value) => setSearchQuery(value)}
      />
      <View>
        {" "}
        <Button style={styles.button} title="Buscar" onPress={handleSubmit} />
      </View>
      {data && <Card news={data} title={true} />}
    </View>
  );
};

export default MyComponent;
