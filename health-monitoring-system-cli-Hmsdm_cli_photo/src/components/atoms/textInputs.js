import { TextInput, StyleSheet, Dimensions } from "react-native"
const windowWidth = Dimensions.get('window').width;

const FormInput = ({
  placeholder, 
  onChangeText,
  inputstyle, 
  secureTextEntry
}) => {
  return(
    <TextInput
    style = {{
      ...styles.container,
      ...inputstyle,
    }}
      underlineColorAndroid="transparent"
      placeholder = {placeholder}
      placeholderTextColor = "A8A6A7"
      autoCapitalize="none"
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry? secureTextEntry: false}
      disabled = 'true'
    />
  )
}


export default FormInput;


const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#A8A6A7",
    borderBottomWidth: 1.5,
    width: windowWidth*90/100,
  },
});