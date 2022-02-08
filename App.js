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

/*This function handles Hooks to create grocerys */
export default function App() {
  /*Hook to create grocerys */
  const [grocery, setGrocery] = useState();
  /*Hook with an array to save the grocery list */
  const [groceryItem, setGroceryItem] = useState([]);

  /*Arrow function */
  const handleAddGrocery = () => {
    /*The keybord disappears when the grocery is added. */
    Keyboard.dismiss();
    /*A function to add the new grocerys to the list. */
    setGroceryItem([...groceryItem, grocery]);
    /*function to empty the textinput, after adding any grocerys to the list*/
    setGrocery("");
  };

  /*Arrow function, with index as an argument */
  const deletGrocery = (index) => {
    let itemCopy = [...groceryItem];
    itemCopy.splice(index, 1);
    setGroceryItem(itemCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.yourTasks}></View>
      <Text style={styles.title}>🍉 Your grocery list 🍉</Text>
      <View style={styles.items}>
        {groceryItem.map((item, index) => {
          return (
            /*onPress with arrow function to remove the grocerys */
            <TouchableOpacity key={index} onPress={() => deletGrocery(index)}>
              <Grocery text={item} />
            </TouchableOpacity>
          );
        })}
      </View>
      {/* conditional rendering, diffrent behaviors for IOS and Android. */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.textWrapper}
      >
        {/* textinput with a place holder to let the user type in thier grocerys, and add to the list */}
        <TextInput
          style={styles.input}
          placeholder={"Type in your grocery here"}
          placeholderTextColor="#FF3CBB"
          value={grocery}
          onChangeText={(text) => setGrocery(text)}
        />
        {/* A button to add the grocerys */}
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
