import React, { useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Grocery from "./src/Grocery";

export default function App() {
  const [grocery, setGrocery] = useState();
  const [groceryItem, setGroceryItem] = useState([]);
  

  const handleAddGrocery = () => {
    /*tar bort keyborden när man lägger till en ny , på de mobila enheterna */
    Keyboard.dismiss();
    setGroceryItem([...groceryItem, grocery]);
    setGrocery("");
  };

  const deletGrocery = (index) => {
    let itemCopy = [...groceryItem];
    itemCopy.splice(index, 1);
    setGroceryItem(itemCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.yourTasks}></View>
      <Text style={styles.title}>🍉 Your grocery list 🍉 </Text>
      <View style={styles.items}>
        {groceryItem.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => deletGrocery(index)}>
              <Grocery text={item} />
            </TouchableOpacity>
          );
        })}
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.textWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Type in your grocery here"}
          placeholderTextColor="#FF3CBB"
          value={grocery}
          onChangeText={(text) => setGrocery(text)}
        />

        <TouchableOpacity onPress={() => handleAddGrocery()}>
          <View style={styles.addWrapper}>
            <Text style={styles.add}>☝️</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  yourTasks: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF3CBB",
    textAlign: "center",
  },
  items: {
    marginTop: 30,
  },
  textWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: "#FFA3DF",
    borderRadius: 60,
    borderColor: "#FF3CBB",
    borderWidth: 1,
  },
  addWrapper: {
    width: 40,
    height: 30,
    backgroundColor: "#FFA3DF",
    borderRadius: 10,
    borderColor: "#FF3CBB",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  add: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF3CBB",
    marginBottom: 3,
  },
});
