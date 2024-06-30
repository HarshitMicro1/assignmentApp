import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export const BASE_DIMENSIONS = {
  width: 375,
  height: 812,
};

const normalizedWidth = (size: number) =>
  (width / BASE_DIMENSIONS.width) * size;
const normalizedHeight = (size: number) =>
  (height / BASE_DIMENSIONS.height) * size;

export {normalizedWidth, normalizedHeight};
