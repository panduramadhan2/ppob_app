import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  BLUE_COLOR,
  BOLD_FONT,
  DARK_BACKGROUND,
  DARK_COLOR,
  GREY_COLOR,
  HORIZONTAL_MARGIN,
  LIGHT_COLOR,
  REGULAR_FONT,
  SLATE_COLOR,
  WHITE_BACKGROUND,
  WHITE_COLOR,
} from '../../utils/const';
import {Eye, EyeCros} from '../../assets';

export default function LoginPage({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [isSecure, setIsSecure] = useState(true);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? DARK_BACKGROUND : WHITE_BACKGROUND,
      }}>
      <View
        style={{
          marginHorizontal: HORIZONTAL_MARGIN,
          justifyContent: 'center',
          height: '100%',
        }}>
        <View style={{marginBottom: 15}}>
          <Text
            style={{
              fontFamily: BOLD_FONT,
              fontSize: 24,
              color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
            }}>
            Login
          </Text>
        </View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
            borderRadius: 5,
            padding: 10,
            fontFamily: REGULAR_FONT,
            color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
          }}
          placeholder="Masukan Email"
          placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
        />

        <View style={{height: 20}} />
        <View
          style={{
            borderWidth: 1,
            borderColor: isDarkMode ? SLATE_COLOR : GREY_COLOR,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <TextInput
            style={{
              fontFamily: REGULAR_FONT,
              color: isDarkMode ? DARK_COLOR : LIGHT_COLOR,
              flex: 1,
            }}
            placeholder="Password"
            placeholderTextColor={isDarkMode ? SLATE_COLOR : GREY_COLOR}
            secureTextEntry={isSecure}
          />
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            {isSecure ? <Eye /> : <EyeCros />}
          </TouchableOpacity>
        </View>

        <View style={{height: 20}} />
        <TouchableOpacity
          style={{backgroundColor: BLUE_COLOR, padding: 10, borderRadius: 5}}
          onPress={() => navigation.navigate('MyTabs')}>
          <Text
            style={{
              color: WHITE_COLOR,
              textAlign: 'center',
              fontFamily: REGULAR_FONT,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={{height: 20}} />

        <Text
          style={{
            color: isDarkMode ? SLATE_COLOR : GREY_COLOR,
            textAlign: 'center',
            fontFamily: REGULAR_FONT,
          }}>
          atau
        </Text>
        <View style={{height: 20}} />
        <View
          style={{
            flexDirection: 'row',
            columnGap: 5,
            justifyContent: 'center',
          }}>
          <Text>Belum punya akun?</Text>
          <TouchableOpacity>
            <Text onPress={() => navigation.navigate('Register')}>Daftar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
