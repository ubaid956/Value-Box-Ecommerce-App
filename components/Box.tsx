import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const Box = () => {
  const [values, setValues] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {values.map((value, index) => (
        <View key={index} style={styles.box}>
          <TextInput
            ref={(ref) => (inputRefs.current[index] = ref)}
            keyboardType="numeric"
            textAlign="center"
            caretHidden={true} // Hides the cursor
            maxLength={1} // Only allows one character
            style={styles.textInput}
            value={value}
            onChangeText={(text) => handleChangeText(text, index)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 56,
    height: 56,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: width * 0.05,
    marginBottom:height*0.05,
    justifyContent: 'center', // Centers text vertically
    alignItems: 'center', // Centers text horizontally
  },
  textInput: {
    fontSize: 24, // Increases text size
    padding: 0, // Removes default padding
    margin: 0, // Removes default margin
    height: '100%',
    width: '100%',
  },
});

export default Box;
