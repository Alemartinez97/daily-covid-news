import * as React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { View, Linking, Text } from "react-native";
import moment from "moment";
import Spinner from "./spinner";
const styles = {
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // margin: 15,
    padding: 15,
  },
  title: {
    fontSize: 15,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  button: {
    width: 240,
    height: 48,
  },
};
const MyComponent = ({ news, title }) => {
  let value;
  if (title) {
    value = "Resultados de busqueda " + news.length + " elementos";
  } else {
    value = news.length + " elementos";
  }
  if (!news[0]) {
    return <Spinner />;
  }
  return (
    <View style={styles.wrapper}>
      {" "}
      <Title>{value}</Title>
      {news.map((e) => {
        return (
          <Card>
            <Card.Content>
              <Title style={styles.title}>{e.title}</Title>
              <Text>{moment(e.publishedAt).format("ll")}</Text>
              <Paragraph>{e.description}</Paragraph>
            </Card.Content>
            <Card.Cover source={e.imageUrl} />
            <Text
              style={{ color: "blue" }}
              onPress={() => Linking.openURL(e.sourceUrl)}
            >
              mas informacion
            </Text>
          </Card>
        );
      })}
    </View>
  );
};
export default MyComponent;
