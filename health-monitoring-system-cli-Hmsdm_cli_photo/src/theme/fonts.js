import { Dimensions } from "react-native"

const windowWidth = Dimensions.get('window').width;

const size = {
  font6: windowWidth * (6 / 365),
  font8: windowWidth * (8 / 365),
  font10: windowWidth * (10 / 365),
  font12: windowWidth * (12 / 365),
  font14: windowWidth * (14 / 365),
  font16: windowWidth * (16 / 365),
  font18: windowWidth * (18 / 365),
  font20: windowWidth * (20 / 365),
  font22: windowWidth * (22 / 365),
  font24: windowWidth * (24 / 365),
  font26: windowWidth * (26 / 365),
  font28: windowWidth * (28 / 365),
  font50: windowWidth * (50 / 365),
}

const weight = {
  full: '900',
  semi: '600',
  low: '400',
  light: '200',
  bold: 'bold',
  normal: 'normal',
}

export default {
  size,
  weight
};