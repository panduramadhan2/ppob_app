import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {CheckProduct} from '../assets';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  FONT_NORMAL,
  GREEN_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  MEDIUM_FONT,
  REGULAR_FONT,
  WHITE_BACKGROUND,
} from '../utils/const';

export default function ProductList({action, selectItem, data}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity
      style={[
        styles.productWrapper(isDarkMode),
        selectItem === data.id ? {borderColor: GREEN_COLOR} : '',
      ]}
      onPress={action}>
      <Text style={styles.productLabel(isDarkMode)}>{data.label}</Text>
      <Text style={styles.productPrice(isDarkMode)}>Rp .{data.price}</Text>
      {selectItem === data.id && (
        <CheckProduct
          width={20}
          style={{position: 'absolute', right: 7, top: 2}}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productWrapper: isDarkmode => ({
    borderWidth: 1,
    borderColor: GREY_COLOR,
    borderRadius: 10,
    padding: 20,
    width: '47%',
    // width: windowWidth / 2 - 30,
    backgroundColor: isDarkmode ? DARK_BACKGROUND : WHITE_BACKGROUND,
  }),
  productLabel: isDarkmode => ({
    fontFamily: MEDIUM_FONT,
    fontSize: FONT_NORMAL,
    color: isDarkmode ? DARK_COLOR : LIGHT_COLOR,
  }),
  productPrice: isDarkmode => ({
    fontFamily: REGULAR_FONT,
    color: isDarkmode ? DARK_COLOR : LIGHT_COLOR,
  }),
});
