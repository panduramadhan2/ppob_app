import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  LIGHT_COLOR,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  windowWidth,
} from '../../utils/const';
import {XClose} from '../../assets';

export default function Input({
  value,
  placeholder,
  onchange,
  type,
  ondelete,
  lebar,
}) {
  const isDarkmode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 5,
        borderColor: isDarkmode ? SLATE_COLOR : GREY_COLOR,
        backgroundColor: isDarkmode ? DARK_BACKGROUND : WHITE_BACKGROUND,
        // padding: 10,
        fontFamily: REGULAR_FONT,
        // color: isDarkmode ? '' : DARK_COLOR,
        color: isDarkmode ? DARK_COLOR : LIGHT_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={GREY_COLOR}
        keyboardType={type ? type : 'default'}
        value={value}
        onChangeText={onchange}
        style={{width: lebar ? lebar : ''}}
      />
      {value !== null && value !== '' && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 10,
          }}
          onPress={ondelete}>
          <XClose width={15} height={15} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
