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
  API_URL,
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
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {storeDataStorage} from '../../utils/localStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../context/AuthContext';

export default function LoginPage() {
  const {setIsLoggedIn} = useAuth();
  const isDarkMode = useColorScheme() === 'dark';
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      await AsyncStorage.setItem('users', JSON.stringify(response.data.data));
      setIsLoggedIn(response.data.data);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post(`${API_URL}/api/auth/login`, {
  //       email,
  //       password,
  //     });

  //     // Menampilkan response penuh untuk debugging
  //     console.log('Full API Response:', response);

  //     // Mengecek apakah response.data dan response.data.users ada
  //     if (response.data && response.data.data && response.data.data.users) {
  //       const userData = response.data.data.users; // Ambil data user

  //       console.log('User Data:', userData);
  //       console.log('Token:', token);

  //       // Menyimpan data pengguna dan token ke AsyncStorage
  //       await AsyncStorage.setItem('users', JSON.stringify(userData));

  //       // Set status login di context atau state
  //       setIsLoggedIn(userData);

  //       // Setelah login berhasil, bisa pindah ke halaman yang diinginkan
  //       // navigation.navigate('Protected'); // Jika ada navigasi yang ingin dituju
  //     } else {
  //       console.log('User data is missing in the response');
  //     }
  //   } catch (error) {
  //     console.log('error : ', error);
  //   }
  // };

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
          value={email}
          onChangeText={text => setEmail(text)}
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
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            {isSecure ? <Eye /> : <EyeCros />}
          </TouchableOpacity>
        </View>

        <View style={{height: 20}} />
        <TouchableOpacity
          style={{backgroundColor: BLUE_COLOR, padding: 10, borderRadius: 5}}
          onPress={handleLogin}>
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
